define('mock-kodr/models/arena', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data'], function (exports, _emberDataModel, _emberDataAttr, _emberData) {

  var Arena = _emberData['default'].Model.extend({
    name: (0, _emberDataAttr['default'])('string', {
      defaultValue: "Still Loading"
    }),
    description: (0, _emberDataAttr['default'])('string', {
      defaultValue: "Isn't life a beautifule thing"
    }),
    flow: (0, _emberDataAttr['default'])('string', {
      defaultValue: "sequential"
    }),
    mock: (0, _emberDataAttr['default'])('boolean', {
      defaultValue: false
    }),
    hasPrerequisit: Ember.computed('prerequisit', function () {
      console.log(this.get('prerequisit'));
      if (this.get('prerequisit') !== null) return true;
      return false;
    }).property('hasPrerequisit'),
    isPublished: (0, _emberDataAttr['default'])('boolean', { defaultValue: false }),
    author: _emberData['default'].belongsTo('user', { async: true, inverse: 'arenas' }),
    prerequisit: _emberData['default'].belongsTo('arena', { defaultValue: null }),
    trials: _emberData['default'].hasMany('trial', { async: true, inverse: 'arena' }),
    users: _emberData['default'].hasMany('userArena', { async: true, inverse: 'arena' }),
    challenges: _emberData['default'].hasMany('challenge', { async: true, inverse: 'arena' })
  });

  // Arena.reopen({
  //   validations: {
  //     name: {
  //       presence: true,
  //       length: {
  //           minimum: 5
  //       }
  //     },
  //     description: {
  //       presence: true,
  //       length: {
  //           minimum: 6
  //       }
  //     }
  //   }
  // });

  exports['default'] = Arena;
});