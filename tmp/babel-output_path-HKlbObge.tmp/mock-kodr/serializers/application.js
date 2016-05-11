define('mock-kodr/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {

    var ApplicationSerializer = _emberData['default'].RESTSerializer.extend({
        primaryKey: '_id'
    });

    exports['default'] = ApplicationSerializer;
});