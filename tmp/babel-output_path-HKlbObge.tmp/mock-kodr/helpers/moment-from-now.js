define('mock-kodr/helpers/moment-from-now', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _mockKodrConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockKodrConfigEnvironment['default'], 'moment.allowEmpty')
  });
});