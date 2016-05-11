define('mock-kodr/services/moment', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _mockKodrConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_mockKodrConfigEnvironment['default'], 'moment.outputFormat')
  });
});