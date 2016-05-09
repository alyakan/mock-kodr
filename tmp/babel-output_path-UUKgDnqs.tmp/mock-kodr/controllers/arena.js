define('mock-kodr/controllers/arena', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		challenges: null
	});
});
// trig: function() {
// 	var that = this;
// 	console.log(that.get('model'))
// 	Ember.run.scheduleOnce('afterRender', this, function() {
// 		this.store.query('challenge', {arena: that.get('model').get('id')}).then(function(c) {
// 			that.set('challenges', c);
// 		});
// 	});
// }.on('init')