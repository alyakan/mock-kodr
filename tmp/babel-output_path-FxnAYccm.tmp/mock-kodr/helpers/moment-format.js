define('mock-kodr/helpers/moment-format', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _mockKodrConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockKodrConfigEnvironment['default'], 'moment.allowEmpty')
  });
});