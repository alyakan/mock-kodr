define('mock-kodr/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'mock-kodr/tests/helpers/start-app', 'mock-kodr/tests/helpers/destroy-app'], function (exports, _qunit, _mockKodrTestsHelpersStartApp, _mockKodrTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mockKodrTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _mockKodrTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});