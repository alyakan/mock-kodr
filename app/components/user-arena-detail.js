import Ember from 'ember';

export default Ember.Component.extend({
	userArena: null,
	onStart: function() {
		var that = this;
		
		Ember.run.scheduleOnce('afterRender', this, function() {
			that.set('userArena.progress', that.get('userArena.progress'))
			that.set('userArena.progressStyle', that.get('userArena.progressStyle'))
				  
        });
	}.on('init'),
	changeProgress: function() {
		var userArena = this.get('userArena')
		var new_exp = userArena.get('exp');
		var progress = userArena.get('progress');
		var styleProgress = Ember.String.htmlSafe("width: " + progress + "%");
		userArena.set('styleProgress', styleProgress);
		Ember.$('#detail-prog-bar').attr('style', styleProgress);
	}.observes('userArena.exp'),
});
