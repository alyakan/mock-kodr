define('mock-kodr/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'mock-kodr/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _mockKodrConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_mockKodrConfigEnvironment['default'].APP.name, _mockKodrConfigEnvironment['default'].APP.version)
  };
});