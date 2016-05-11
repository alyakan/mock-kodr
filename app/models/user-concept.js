import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
	exp: attr('number'),
  max_exp: attr('number'),
  last_practiced: attr('date'),  
  slope: attr('number'),
  x: attr('number'),
  // progress: Ember.computed('trials', 'completed', function() {
		// // Number of completed trials / Total number of trials

  // 	var prog = (this.get('completed') / this.get('trials').toArray().length) * 100
  //   console.log(Ember.typeOf(prog))
  //   if (prog > 0)
  //     var a = 0;
  //   else
  //     prog = 0;
  // 	return Math.round(prog)
  // }).property('progress'),
  user:DS.belongsTo('user', {inverse: 'userConcepts', async:true}),
  concept:DS.belongsTo('concept', {inverse: 'userConcepts', async:true}),
});