define('mock-kodr/models/activity', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data'], function (exports, _emberDataModel, _emberDataAttr, _emberData) {

	var Activity = _emberData['default'].Model.extend({
		subjectModel: (0, _emberDataAttr['default'])('string'),
		subjectId: (0, _emberDataAttr['default'])(),
		verb: (0, _emberDataAttr['default'])('string'),
		action: (0, _emberDataAttr['default'])('string'),
		objectModel: (0, _emberDataAttr['default'])('string'),
		objectId: (0, _emberDataAttr['default'])(),
		time: (0, _emberDataAttr['default'])('date')
	});

	exports['default'] = Activity;
});