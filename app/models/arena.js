import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  isPublished: attr('boolean'),
  // challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),
});
