import Ember from 'ember';

export default Ember.Component.extend({
	store: null,
	trial: null,
	concepts: [],
	challenge: null,
	trials: [],
	done: false,
	onInit: function() {
		var that = this;
		
		Ember.run.scheduleOnce('afterRender', this, function() {
			if(that.get('trial.challenge')) {
				var ch_id = that.get('trial.challenge').get('id');
				that.store.findRecord('challenge', ch_id).then(function(challenge) {
					that.set('concepts', challenge.get('concepts').toArray());
				});
			}
				  
        });
	}.on('init'),
	actions: {
		correctAnswer: function() {
			var trials = this.get('trials').toArray();
			var that = this;
			if (trials.length) {
				var trial = trials[Math.floor(Math.random()*trials.length)];
				var ch_id = trial.get('challenge').get('id');
				this.store.findRecord('challenge', ch_id).then(function(challenge) {
					that.set('concepts', challenge.get('concepts').toArray());
				});
				trials = trials.removeObject(trial);
				this.set('trial', trial);
				this.set('trials', trials);
			} else {
				this.set('done', true);
			}
			
		}
	}
});
