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
  		var challenge = this.getProperties('name', 'exp');
  		var pre_id = Ember.$('#prerequisit').val();
  		challenge.arena = this.get('arena').id  		
			challenge.mock = true;
			challenge.isPublished = true;
			challenge.flags = {
				beta: false
			}
			$.ajaxSetup({
			    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
			});
			Ember.$.ajax({
        url: '/api/challenges',
        type: 'POST',
        data: {
          challenge: challenge
        }
      }).then(function(response) {
      	that.store.createRecord('challenge', challenge);
      })
  		
  		
  	}
  }
});
