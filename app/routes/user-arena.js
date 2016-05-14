import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
	current_user: storageFor('current_user'),
	model: function(params) {
		var router = this;
		return this.store.findRecord('userArena', params.user_arena_id).then(function (userArena) {

			return router.store.query('trial', {'arena':userArena.get('arena.id'), 'user':router.get('current_user.user.id'), 'complete': false}).then(function(trials) {
				
				var trial = trials.toArray()[Math.floor(Math.random()*trials.toArray().length)];
				
				trials = trials.toArray().removeObject(trial);
				router.controllerFor('userArena').set('userArena.progress', userArena.get('progress'))
				router.controllerFor('userArena').set('randomTrial', trial);
				router.controllerFor('userArena').set('userArena.arena', userArena.get('arena'));
				router.controllerFor('userArena').set('userArena.trials', trials);
				router.controllerFor('userArena').set('trials', trials);
				// router.controllerFor('userArena').setProperties({
					// userArena.progress: userArena.get('progress'),
					// randomTrial: trial,
					// userArena.arena: userArena.get('arena'),
					// userArena.trials: trials,
					// trials: trials
				// })
				return userArena;
				
			});
			
		});
		
	}
});
