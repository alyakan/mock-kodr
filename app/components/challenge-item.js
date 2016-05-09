import Ember from 'ember';

export default Ember.Component.extend({
	store: null,
	actions: {
		edit: function() {
			Ember.$('#modal-trigger').click();
		}
	}
	

});
