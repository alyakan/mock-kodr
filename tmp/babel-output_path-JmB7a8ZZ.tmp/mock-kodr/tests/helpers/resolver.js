define('mock-kodr/tests/helpers/resolver', ['exports', 'mock-kodr/resolver', 'mock-kodr/config/environment'], function (exports, _mockKodrResolver, _mockKodrConfigEnvironment) {

  var resolver = _mockKodrResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mockKodrConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockKodrConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});