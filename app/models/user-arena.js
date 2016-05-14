import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
	exp: attr('number'),
  completed: attr('number'),
  complete: attr('boolean'),  
  locked: attr('boolean'),
  progress: Ember.computed('trials', 'completed', function() {
		// Number of completed trials / Total number of trials

  	var prog = (this.get('completed') / this.get('trials').toArray().length) * 100
    if (prog > 0)
      var a = 0;
    else
      prog = 0;
  	return Math.round(prog)
  }).property('progress'),
  prerequisit: DS.belongsTo('arena', {inverse: 'users', async:true}),
  trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),
  user:DS.belongsTo('user', {inverse: 'userArenas', async:true}),
  arena:DS.belongsTo('arena', {inverse: 'users', async:true}),
  // trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),  
});
