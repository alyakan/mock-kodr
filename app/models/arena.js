import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';

var Arena = DS.Model.extend({
  name: attr('string', {
    defaultValue: "Still Loading"
  }),
  description: attr('string', {
    defaultValue: "Isn't life a beautifule thing"
  }),
  flow: attr('string', {
    defaultValue: "sequential"
  }),
  mock: attr('boolean', {
    defaultValue: false
  }),
  hasPrerequisit: Ember.computed('prerequisit', function() {
    console.log(this.get('prerequisit'))
    if (this.get('prerequisit') !== null)
      return true;
    return false;
  }).property('hasPrerequisit'),
  isPublished: attr('boolean', {defaultValue:true}),
  author: DS.belongsTo('user', {async:true, inverse:'arenas'}),
  prerequisit: DS.belongsTo('arena', {defaultValue:null}),
  trials: DS.hasMany('trial', {async:true, inverse: 'arena'}),
  users: DS.hasMany('userArena', {async:true, inverse: 'arena'}),
  challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),
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

export default Arena;
