define('mock-kodr/models/user-arena', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {

  var attr = _emberData['default'].attr;

  exports['default'] = _emberData['default'].Model.extend({
    exp: attr('number'),
    completed: attr('number'),
    complete: attr('boolean'),
    locked: attr('boolean'),
    progress: _ember['default'].computed('trials', 'completed', function () {
      // Number of completed trials / Total number of trials

      var prog = this.get('completed') / this.get('trials').toArray().length * 100;
      console.log(_ember['default'].typeOf(prog));
      if (prog > 0) var a = 0;else prog = 0;
      return Math.round(prog);
    }).property('progress'),
    prerequisit: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true }),
    trials: _emberData['default'].hasMany('trials', { inverse: 'userArena', async: true }),
    user: _emberData['default'].belongsTo('user', { inverse: 'userArenas', async: true }),
    arena: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true })
  });
});
// trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),