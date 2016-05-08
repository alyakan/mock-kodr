import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
  store: null,
  actions: {
  	toggleForm: function() {
  		Ember.$('.collapse').collapse("toggle");
  		Ember.$('#toggle-btn').toggle();
  	},
  	save: function() {
  		var that = this;
  		var arena = this.getProperties('name', 'description');
  		var pre_id = Ember.$('#prerequisit').val();
  		if (pre_id !== "None") {
  			this.store.findRecord('arena', pre_id).then(function(p) {
					arena.prerequisit = p.id;
					arena.mock = true;
					console.log(arena)
					$.ajaxSetup({
					    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
					});
					Ember.$.ajax({
		        url: '/api/arenas',
		        type: 'POST',
		        data: {
		          arena: arena
		        }
		      }).then(function(response) {
		      	that.store.createRecord('arena', arena);
		      	console.log(response)
		      })
	  			
	  		});
  		} else {
  			arena.mock = true;
  			$.ajaxSetup({
				    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
				});
				Ember.$.ajax({
	        url: '/api/arenas',
	        type: 'POST',
	        data: {
	          arena: arena
	        }
	      }).then(function(response) {
	      	that.store.createRecord('arena', arena);
	      	console.log(response)
	      })
  		}
  		
  		
  		//arena.prerequisit = this.store.findRecord('arena', Ember.$('#prerequisit').val());
  		
  		
  	}
  }
});
