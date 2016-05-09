import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
export default Ember.Component.extend({
	session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
  arena: null,
  store: null,
  actions: {
  	toggleForm: function() {
  		Ember.$('.collapse').collapse("toggle");
  		Ember.$('#toggle-btn').toggle();
  	},
  	save: function() {
  		var that = this;
  		var concept = this.getProperties('name', 'max_exp');
  		concept.author = this.get('current_user.user')
			$.ajaxSetup({
			    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
			});
			Ember.$.ajax({
        url: '/api/concepts',
        type: 'POST',
        data: {
          concept: concept
        }
      }).then(function(response) {
      	that.store.createRecord('concept', response.concept);
      });
  		
  		
  	}
  }
});
