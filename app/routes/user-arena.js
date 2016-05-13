import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
	current_user: storageFor('current_user'),
	model: function(params) {
		var router = this;
		// return router.store.query('userArena', {'id': params.user_arena_id}).then(function(ua) {
		// 		console.log(ua.get('id'))
		// 	})

		return this.store.findRecord('userArena', params.user_arena_id).then(function (userArena) {
			

			router.store.query('trial', {'arena':userArena.get('arena.id'), 'user':router.get('current_user.user.id')}).then(function(trials) {
				
			})
			return userArena
		});
		
	}
});
