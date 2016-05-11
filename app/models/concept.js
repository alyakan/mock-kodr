import Model from 'ember-data/model';
import DS from 'ember-data';
var attr = DS.attr;
var hasMany = DS.hasMany;
export default DS.Model.extend({
	name: attr('string'),
  max_exp: attr('number', {
    defaultValue: 10
  }),
  author: DS.belongsTo('user', {
    async: true,
    inverse: 'concepts'
  }),
  challenges: hasMany('challenge', {async: true, inverse: 'concepts'}),
  userConcepts: hasMany('userConcept',{async: true, inverse: 'concept'}),
});
