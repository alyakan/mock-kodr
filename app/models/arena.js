import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  isPublished: attr('boolean'),
  users: DS.hasMany('userArena', {async:true, inverse: 'arena'}),
  // challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),
});
