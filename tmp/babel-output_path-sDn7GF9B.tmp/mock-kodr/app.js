define('mock-kodr/app', ['exports', 'ember', 'mock-kodr/resolver', 'ember-load-initializers', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrResolver, _emberLoadInitializers, _mockKodrConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _mockKodrConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockKodrConfigEnvironment['default'].podModulePrefix,
    Resolver: _mockKodrResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _mockKodrConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});