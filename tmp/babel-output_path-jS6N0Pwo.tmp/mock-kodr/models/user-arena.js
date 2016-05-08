define('mock-kodr/models/user-arena', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {

   var attr = _emberData['default'].attr;

   exports['default'] = _emberData['default'].Model.extend({
      exp: attr('number'),
      completed: attr('number'),
      complete: attr('boolean'),
      user: _emberData['default'].belongsTo('user', { inverse: 'userArenas', async: true }),
      locked: attr('boolean'),
      prerequisit: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true }),
      progress: _ember['default'].computed('trials', 'completed', function () {
         // Number of completed trials / Total number of trials
         var prog = this.get('completed') / this.get('trials').toArray().length * 100;
         return Math.round(prog);
      }).property('progress')
   });
});
// trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),