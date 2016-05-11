define('mock-kodr/helpers/moment-to-now', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _mockKodrConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockKodrConfigEnvironment['default'], 'moment.allowEmpty')
  });
});