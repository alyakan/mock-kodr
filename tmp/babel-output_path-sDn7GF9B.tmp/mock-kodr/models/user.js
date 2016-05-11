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
    trials: hasMany('trial', { async: true, inverse: 'user' }),
    arenas: hasMany('arena', { async: true, inverse: 'author' }),
    challenges: hasMany('challenge', { async: true, inverse: 'author' }),
    concepts: hasMany('concept', { async: true, inverse: 'author' }),
    atLeastTeacher: Ember.computed('role', function () {
      return this.get('role') === 'admin' || this.get('role') === 'teacher';
    }).property('atLeastTeacher')
  });
});