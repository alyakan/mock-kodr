define('mock-kodr/models/concept', ['exports', 'ember-data/model', 'ember-data'], function (exports, _emberDataModel, _emberData) {
  var attr = _emberData['default'].attr;
  var hasMany = _emberData['default'].hasMany;
  exports['default'] = _emberData['default'].Model.extend({
    name: attr('string', {
      defaultValue: "New Concept"
    }),
    max_exp: attr('number', {
      defaultValue: 10
    }),
    author: _emberData['default'].belongsTo('user', {
      async: true,
      inverse: 'concepts'
    }),
    challenges: hasMany('challenge', { async: true, inverse: 'concepts' })
  });
});