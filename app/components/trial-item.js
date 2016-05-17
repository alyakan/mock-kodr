import Ember from 'ember';
//import Bootstrap from 'ember-bootstrap'
import { storageFor } from 'ember-local-storage';
export default Ember.Component.extend({
	store: null,
	trial: null,
	concepts: [],
	challenge: null,
	trials: [],
	done: true,
	userArena: null,
	next_trial: false,
	current_user: storageFor('current_user'),
	onInit: function() {
		var that = this;
		
		Ember.run.scheduleOnce('afterRender', this, function() {
			if(that.get('trial.challenge')) {
				that.set('done', false);
				var ch_id = that.get('trial.challenge').get('id');
				that.store.findRecord('challenge', ch_id).then(function(challenge) {
					that.set('challenge', challenge);
					that.set('concepts', challenge.get('concepts').toArray());
					that.set('trial.exp', challenge.get('exp'));
					return challenge;
				}).then(function(challenge) {

					if (!that.get('trial.started')) {
						that.store.findRecord('trial', that.get('trial.id')).then(function(trial) {
							var date = new Date(Date.now());
							trial.setProperties({
								started: true,
								startTime: date
							});
							trial.save();
						});
					}

				});
			}
				  
        });
	}.on('init'),
	actions: {
		correctAnswer: function() {
			var trials = this.get('trials').toArray();
			var that = this;
			this.store.findRecord('trial', this.get('trial.id')).then(function(trial) {
				/*
					Correct Answer provided, update current trial accordingly
				*/
				if (trial.get('completed'))
					var date = trial.get('endTime');
				else
					var date = new Date(Date.now());
				trial.setProperties({
					complete: true,
					endTime: date
				});
				// TODO: create activity
				trial.save();
				trials = trials.removeObject(trial);
				that.set('trials', trials);
				return trial;
			}).then(function(trial) {
				return that.store.findRecord('userArena', that.get('userArena.id')).then(function(userArena) {
					/*
						Increment userArena's Exp with trial's Exp
					*/
					var current_exp = userArena.get('exp');
					var trial_exp = trial.get('exp');
					
					var new_exp = current_exp + trial_exp;
					var complete = false;
					if (userArena.get('max_exp') < new_exp) {
						/*
							The user just completed this userArena
						*/
						complete = true
					}
					var progress = Math.round((new_exp / userArena.get('max_exp')) * 100);
					if (progress > 0) {
				    	if (progress > userArena.get('max_exp')) {
				        	progress = 100;
				      	}
				    }
				    else {
				      progress = 0;
				    }
					userArena.setProperties({
						exp: new_exp,
						complete: complete,
						progress: progress,
						completed: userArena.get('completed') + 1
					});
					
					return userArena.save();
					
				}).then(function() {
					if (trials.length) {
						/*
							Retrieve a new trial by removing the current one from the list
							and getting a random new one.
						*/
						var randomTrial = trials[Math.floor(Math.random()*trials.length)];
						var ch_id = randomTrial.get('challenge').get('id');
						that.store.findRecord('challenge', ch_id).then(function(challenge) {
							// console.log(challenge.get('concepts').toArray()); // KEEP this console.log !!
							
							that.set('trial', randomTrial);
							
							var cons = challenge.get('concepts').toArray()
							that.set('concepts', cons);
							that.set('trial.exp', challenge.get('exp'));
							return challenge;
							//that.set('next_trial', true);
						}).then(function(challenge) {
							/*
								set start date to now and started to true
							*/
							if (!randomTrial.get('started')) {

								that.store.findRecord('trial', randomTrial.get('id')).then(function(trial) {
									var date = new Date(Date.now());
									trial.setProperties({
										started: true,
										startTime: date
									});
									trial.save();
								});
							}
						});
						
					} else {
						that.set('done', true);
					}
				});
				
			});
			
			
		},
		
	},
	
});
