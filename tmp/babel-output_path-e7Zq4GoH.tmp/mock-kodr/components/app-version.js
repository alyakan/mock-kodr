define('mock-kodr/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'mock-kodr/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _mockKodrConfigEnvironment) {

  var name = _mockKodrConfigEnvironment['default'].APP.name;
  var version = _mockKodrConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});