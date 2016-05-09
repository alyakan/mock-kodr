import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash/lodash';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
  arena: null,
  store: null,
  challenge: null,
  concepts: [],
  chosenConcepts: [],
  trigger: function() {
  	var that = this;
  	this.store.findAll('concept').then(function(concepts) {
	  	var arr = [];
	  	concepts.map(function(c) {
				arr.push({
					name: c.get('name'),
					id: c.get('id')
				});			
			});
  		that.set('concepts', arr);
  	});
  	
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
  		var c_arr = [];
  		var concepts = this.get('chosenConcepts');
  		var c_arr = _.map(concepts, function(c) {
  			return c.id;
  		});
  		challenge.concepts = c_arr;			
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
      		ch.set('name', challenge.name);
      		ch.set('exp', challenge.exp);
      		ch.set('concepts', ch.get('concepts'));
      		Ember.$('.close').click();
      	})
      });
  	},
  	closeModal: function() {
  		console.log()
  		this.transitionToRoute('arena', {arena_id: this.get('model').get('arena').get('id')});
  	}
  }
});
