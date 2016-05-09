import Ember from 'ember';

export default Ember.Component.extend({
	store: null,
	challenge: null,
	concepts: [],
	trigger: function() {
  	var that = this;
  	Ember.run.scheduleOnce('afterRender', this, function() {
  		this.store.findRecord('challenge', this.get('challenge').get('id')).then(function(ch) {
  			that.set('challenge', ch);
  			that.set('concepts', ch.get('concepts'));
  		});
  	});
  	
  }.on('init'),
	actions: {
		edit: function() {
			Ember.$('#modal-trigger').click();
		}
	}
	

});
