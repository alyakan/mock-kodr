define('mock-kodr/models/user', ['exports', 'ember-data'], function (exports, _emberData) {

  var attr = _emberData['default'].attr;
  var hasMany = _emberData['default'].hasMany;

  exports['default'] = _emberData['default'].Model.extend({
    uniId: attr('string'),
    username: attr('string'),
    email: attr('string'),
    exp: attr('number', { defaultValue: 0 }),
    rp: attr('number', { defaultValue: 0 }),
    role: attr('string'),
    activated: attr('boolean'),
    labGroup: attr('string'),
    lectureGroup: attr('string'),
    userArenas: hasMany('userArena', { async: true, inverse: 'user' }),
    trials: hasMany('trial', { async: true, inverse: 'user' })
  });
});