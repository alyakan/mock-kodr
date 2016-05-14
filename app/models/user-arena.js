import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
	exp: attr('number'),
  completed: attr('number'),
  complete: attr('boolean'),  
  locked: attr('boolean'),
  mock: attr('boolean'),
  max_exp: attr('number'),
  progress: Ember.computed('exp', 'completed', 'max_exp', function() {
		// Number of completed trials / Total number of trials

  	var prog = (this.get('exp') / this.get('max_exp')) * 100
    if (prog > 0) {
      if (prog > this.get('max_exp')) {
        prog = 100;
      }
    }
    else {
      prog = 0;
    }
  	return Math.round(prog);
  }).property('progress'),
  styleProgress: Ember.computed('progress', function() {
    // Number of completed trials / Total number of trials

    var prog = this.get('progress')
    return Ember.String.htmlSafe("width: " + prog + "%")
  }).property('styleProgress'),

  prerequisit: DS.belongsTo('arena', {inverse: 'users', async:true}),
  trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),
  user:DS.belongsTo('user', {inverse: 'userArenas', async:true}),
  arena:DS.belongsTo('arena', {inverse: 'users', async:true}),
  // trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),  
});
