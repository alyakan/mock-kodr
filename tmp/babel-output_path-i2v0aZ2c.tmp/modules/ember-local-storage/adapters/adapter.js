import Ember from 'ember';
import DS from 'ember-data';
import { getStorage } from '../helpers/storage';
import StorageArray from '../local/array';
import ImportExportMixin from '../mixins/adapters/import-export';

var keys = Object.keys || Ember.keys;

var JSONAPIAdapter = DS.JSONAPIAdapter;
var get = Ember.get;
var RSVP = Ember.RSVP;
var run = Ember.run;
var Inflector = Ember.Inflector;
var typeOf = Ember.typeOf;
var isEmpty = Ember.isEmpty;

// Ember data ships with ember-inflector
var inflector = Inflector.inflector;

export default JSONAPIAdapter.extend(ImportExportMixin, {
  _debug: false,
  _storage: getStorage('local'),
  _indices: {},
  isNewSerializerAPI: true,
  coalesceFindRequests: false,

  // Reload behavior
  shouldReloadRecord: function shouldReloadRecord() {
    return true;
  },
  shouldReloadAll: function shouldReloadAll() {
    return true;
  },
  shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
    return true;
  },
  shouldBackgroundReloadAll: function shouldBackgroundReloadAll() {
    return true;
  },

  generateIdForRecord: function generateIdForRecord() {
    return Math.random().toString(32).slice(2).substr(0, 8);
  },

  // Relationship sugar
  createRecord: function createRecord(store, type, snapshot) {
    snapshot.eachRelationship(function (name, relationship) {
      var kind = relationship.kind;
      var options = relationship.options;

      if (kind === 'belongsTo' && options.autoSave) {
        snapshot.record.get(name).then(function (record) {
          if (record) {
            record.save();
          }
        });
      }
    });

    return this._super.apply(this, arguments);
  },

  deleteRecord: function deleteRecord(store, type, snapshot) {
    snapshot.eachRelationship(function (name, relationship) {
      var kind = relationship.kind;
      var options = relationship.options;

      if (kind === 'hasMany' && options.dependent === 'destroy') {
        snapshot.record.get(name).then(function (records) {
          records.forEach(function (record) {
            record.destroyRecord();
          });
        });
      }

      if (kind === 'belongsTo' && options.autoSave) {
        snapshot.record.get(name).then(function (record) {
          if (record) {
            record.save();
          }
        });
      }
    });

    return this._super.apply(this, arguments);
  },

  // Polyfill queryRecord
  queryRecord: function queryRecord(store, type, query) {
    var records = this._super.apply(this, arguments);

    if (!records) {
      var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);

      if (this.sortQueryParams) {
        query = this.sortQueryParams(query);
      }

      records = this.ajax(url, 'GET', { data: query });
    }

    return records.then(function (result) {
      result = result.data[0];
      // hack to fix https://github.com/emberjs/data/issues/3790
      // and https://github.com/emberjs/data/pull/3866
      try {
        store._pushInternalModel(null);
        return { data: result || null };
      } finally {
        return { data: result || [] };
      }
    });
  },

  // Delegate to _handleStorageRequest
  ajax: function ajax() {
    return this._handleStorageRequest.apply(this, arguments);
  },

  // Delegate to _handle${type}Request
  _handleStorageRequest: function _handleStorageRequest(url, type) {
    var _this = this;

    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (this._debug) {
      console.log(url, type, options);
    }

    return new RSVP.Promise(function (resolve, reject) {
      var handler = _this['_handle' + type + 'Request'];
      if (handler) {
        var data = handler.call(_this, url, options.data);
        run(null, resolve, { data: data });
      } else {
        run(null, reject, 'There is nothing to handle _handle' + type + 'Request');
      }
    }, 'DS: LocalStorageAdapter#_handleStorageRequest ' + type + ' to ' + url);
  },

  _handleGETRequest: function _handleGETRequest(url, query) {
    var _this2 = this;

    var _urlParts2 = this._urlParts(url);

    var type = _urlParts2.type;
    var id = _urlParts2.id;

    var storage = get(this, '_storage'),
        storageKey = this._storageKey(type, id);

    if (id) {
      return storage[storageKey] ? JSON.parse(storage[storageKey]) : null;
    }

    var records = this._getIndex(type).filter(function (storageKey) {
      return storage[storageKey];
    }).map(function (storageKey) {
      return JSON.parse(storage[storageKey]);
    });

    if (query && query.filter) {
      var _ret = (function () {
        var serializer = _this2.store.serializerFor(inflector.singularize(type));

        return {
          v: records.filter(function (record) {
            return _this2._queryFilter(record, serializer, query.filter);
          })
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }

    return records;
  },

  _handlePOSTRequest: function _handlePOSTRequest(url, record) {
    var _record$data = record.data;
    var type = _record$data.type;
    var id = _record$data.id;

    var storageKey = this._storageKey(type, id);

    this._addToIndex(type, storageKey);
    get(this, '_storage')[storageKey] = JSON.stringify(record.data);

    return null;
  },

  _handlePATCHRequest: function _handlePATCHRequest(url, record) {
    var _record$data2 = record.data;
    var type = _record$data2.type;
    var id = _record$data2.id;

    var storageKey = this._storageKey(type, id);

    this._addToIndex(type, storageKey);
    get(this, '_storage')[storageKey] = JSON.stringify(record.data);

    return null;
  },

  _handleDELETERequest: function _handleDELETERequest(url) {
    var _urlParts3 = this._urlParts(url);

    var type = _urlParts3.type;
    var id = _urlParts3.id;

    var storageKey = this._storageKey(type, id);

    this._removeFromIndex(type, storageKey);
    delete get(this, '_storage')[storageKey];

    return null;
  },

  _queryFilter: function _queryFilter(data, serializer) {
    var _this3 = this;

    var query = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var queryType = typeOf(query),
        dataType = typeOf(data);

    if (queryType === 'object' && dataType === 'object') {
      return keys(query).every(function (key) {
        var queryValue = query[key],
            recordValue = undefined;

        // normalize type
        if (key === 'type' && typeOf(queryValue) === 'string') {
          queryValue = inflector.pluralize(queryValue);
        }

        // Attributes
        if (key === 'id' || key === 'type') {
          recordValue = data[key];
        } else {
          key = serializer.keyForAttribute(key);
          recordValue = data.attributes ? data.attributes[key] : null;
        }

        if (recordValue !== undefined) {
          return _this3._matches(recordValue, queryValue);
        }

        // Relationships
        key = serializer.keyForRelationship(key);
        if (data.relationships && data.relationships[key]) {
          if (isEmpty(data.relationships[key].data)) {
            return;
          }

          return _this3._queryFilter(data.relationships[key].data, serializer, queryValue);
        }
      });
    } else if (queryType === 'array') {
      // belongsTo
      if (dataType === 'object') {
        var queryMessage = query.map(function (item) {
          return keys(item).map(function (key) {
            return key + ': ' + item[key];
          });
        }).join(', ');

        throw new Error('You can not provide an array with a belongsTo relation. ' + 'Query: ' + queryMessage);

        // hasMany
      } else {
          return query.every(function (queryValue) {
            return _this3._queryFilter(data, serializer, queryValue);
          });
        }
    } else {
      // belongsTo
      if (dataType === 'object') {
        return this._matches(data.id, query);

        // hasMany
      } else {
          return data.some(function (record) {
            return _this3._queryFilter(record, serializer, query);
          });
        }
    }
  },

  _matches: function _matches(recordValue, queryValue) {
    if (typeOf(queryValue) === 'regexp') {
      return queryValue.test(recordValue);
    }

    return recordValue === queryValue;
  },

  _urlParts: function _urlParts(url) {
    var parts = url.split('/');

    // remove empty part
    parts.shift();

    var type = parts.shift();
    var id = parts.shift();

    if (type === this.modelNamespace) {
      type = type + '/' + id;
      id = parts.shift();
    }

    return {
      type: type,
      id: id
    };
  },

  _storageKey: function _storageKey(type, id) {
    return type + '-' + id;
  },

  _getIndex: function _getIndex(type) {
    var indices = get(this, '_indices');

    if (!indices[type]) {
      indices[type] = StorageArray.extend({ _storageKey: 'index-' + type }).create();
    }

    return indices[type];
  },

  _indexHasKey: function _indexHasKey(type, id) {
    return this._getIndex(type).indexOf(id) !== -1;
  },

  _addToIndex: function _addToIndex(type, id) {
    if (!this._indexHasKey(type, id)) {
      this._getIndex(type).addObject(id);
    }
  },

  _removeFromIndex: function _removeFromIndex(type, id) {
    this._getIndex(type).removeObject(id);
  }
});