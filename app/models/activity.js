import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';

var Activity = DS.Model.extend({
	subjectModel: attr('string'),
	subjectId: attr(),
	verb: attr('string'),
	action: attr('string'),
	objectModel: attr('string'),
	objectId: attr(),
	time: attr('date')
});

export default Activity;
