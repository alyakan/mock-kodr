define('mock-kodr/helpers/moment-calendar', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _mockKodrConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockKodrConfigEnvironment['default'], 'moment.allowEmpty')
  });
});