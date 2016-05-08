import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  uniId: attr('string'),
  username: attr('string'),
  email: attr('string'),
  exp: attr('number', {defaultValue:0}),
  rp: attr('number',{defaultValue:0}),
  role:attr('string'),
  activated:attr('boolean'),
  labGroup: attr('string'),
  lectureGroup: attr('string'),
  userArenas: hasMany('userArena',{async: true, inverse: 'user'}),
  trials: hasMany('trial',{async: true, inverse: 'user'}),
  arenas: hasMany('arena', {async: true, inverse: 'author'}),
});
