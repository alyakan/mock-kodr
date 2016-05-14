import Ember from 'ember';

export default Ember.Controller.extend({
	trials: [],
	userArena: {},
	randomTrial: {},
	actions: {
		getRandom: function() {
			var trials = this.get('userArena.trials');
			var item = trials.toArray()[Math.floor(Math.random()*trials.toArray().length)]
			this.set('randomTrial', item);
		}
	}
});
