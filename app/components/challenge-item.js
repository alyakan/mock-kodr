import Ember from 'ember';

export default Ember.Component.extend({
	store: null,
	challenge: null,
	concepts: [],
	onLoad: function() {
		var that = this;
		var id = this.get('challenge').get('id');
		Ember.run.scheduleOnce('afterRender', this, function() {
			this.store.findRecord('challenge', id).then(function(ch) {

				console.log(ch.get('concepts'));
				that.set('challenge', ch);
				that.set('concepts', ch.get('concepts').toArray());
			});
		});
	}.on('init'),
	actions: {
		edit: function() {
			Ember.$('#modal-trigger').click();
		}
	}
	

});
