import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
  arena: null,
  store: null,
  challenge: null,
  trigger: function() {
  	Ember.run.scheduleOnce('afterRender', this, function() {
       Ember.$('#modal-trigger').click();
    });

  }.on('init'),
  actions: {
  	
  	toggleForm: function() {
  		Ember.$('.collapse').collapse("toggle");
  		Ember.$('#toggle-btn').toggle();
  	},
  	save: function() {
  		var that = this;
  		var challenge = {};
  		challenge.name = Ember.$('#name-edit').val();
  		challenge.exp = Ember.$('#exp-edit').val();
  		console.log(challenge)
			$.ajaxSetup({
			    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
			});
			Ember.$.ajax({
        url: '/api/challenges/' + that.get('model').get('id'),
        type: 'PUT',
        data: {
          challenge: challenge
        }
      }).then(function(response) {
      	that.store.findRecord('challenge', that.get('model').get('id')).then(function(ch) {
      		ch.set('name', ch.get('name'));
      		ch.set('exp', ch.get('exp'));
      		Ember.$('.class').click();
      	});
      });
  	},
  	closeModal: function() {
  		console.log()
  		this.transitionToRoute('arena', {arena_id: this.get('model').get('arena').get('id')});
  	}
  }
});
