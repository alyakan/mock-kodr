import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
	trials: [],
	userArena: {},
	randomTrial: {},
	current_user: storageFor('current_user'),
	actions: {
		getRandom: function() {
			var trials = this.get('userArena.trials');
			var item = trials.toArray()[Math.floor(Math.random()*trials.toArray().length)]
			this.set('randomTrial', item);
		},
		reset: function() {
			var trials = this.get('trials').toArray();
			var store = this.store;
			var userArena = this.get('model');
			
			store.findRecord('userArena', userArena.id).then(function(uA) {
				uA.setProperties({
					completed: 0,
					complete: false,
					exp:0
				});
				uA.save();
			}).then(function() {
				trials.map(function(trial) {
					store.findRecord('trial', trial.get('id')).then(function(trial) {
						trial.setProperties({
							started: false,
							completed: 0,
							complete: false,
							startTime: null,
							endTime: null
						});
						trial.save();
					});
				});
			});
			
		},
		resetUC: function() {
			var store = this.store;
			var uid = this.get('current_user.id');
			store.queryRecord('concept', {name: 'Strings'}).then(function(concept) {
				store.queryRecord('userConcept', {user: uid, concept: concept.get('id')}).then(function(userConcept) {
					// console.log(userConcept.get('id'))
					userConcept.setProperties({
						exp: 0,
						last_practiced: null
					});
					userConcept.save();
				});
				
			});			
		},
	}
});
