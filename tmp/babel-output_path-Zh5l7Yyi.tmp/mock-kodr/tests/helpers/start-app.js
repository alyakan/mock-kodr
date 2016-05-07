define('mock-kodr/tests/helpers/start-app', ['exports', 'ember', 'mock-kodr/app', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrApp, _mockKodrConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _mockKodrConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _mockKodrApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});