define('mock-kodr/models/arena', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data'], function (exports, _emberDataModel, _emberDataAttr, _emberData) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    description: (0, _emberDataAttr['default'])('string'),
    isPublished: (0, _emberDataAttr['default'])('boolean'),
    users: _emberData['default'].hasMany('userArena', { async: true, inverse: 'arena' })
  });
});
// challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),