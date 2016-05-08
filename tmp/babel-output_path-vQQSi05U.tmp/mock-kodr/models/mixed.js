define('mock-kodr/models/mixed', ['exports', 'ember'], function (exports, _ember) {
    var _ = window._;

    exports['default'] = _ember['default'].Object.extend({
        propertyKeys: [],
        original: {},
        init: function init() {
            this.set('propertyKeys', Object.keys(this.__ember_meta__.proto));
            this.set('original', this.__ember_meta__.proto);
            this._super.apply(this, arguments);
        },
        set: function set(path, value) {
            this._super.apply(this, arguments);
            if (value === undefined) {
                delete this[path];
                _.pull(this.propertyKeys, path);
            } else {
                this.propertyKeys = _.union(this.propertyKeys, [path]);
            }
        },
        setProperties: function setProperties(obj) {
            this._super.apply(this, arguments);
            this.propertyKeys = _.union(this.propertyKeys, _.keys(_.filter(obj, undefined)));
        },
        toJSON: function toJSON() {
            var propertyKeys = _.chain(this.propertyKeys).pull('original').pull('propertyKeys').value();
            return this.getProperties(propertyKeys);
        }
    });
});