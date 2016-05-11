define('mock-kodr/components/challenge-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		store: null,
		challenge: null,
		concepts: [],
		onLoad: (function () {
			var that = this;
			var id = this.get('challenge').get('id');
			_ember['default'].run.scheduleOnce('afterRender', this, function () {
				this.store.findRecord('challenge', id).then(function (ch) {

					console.log(ch.get('concepts'));
					that.set('challenge', ch);
					that.set('concepts', ch.get('concepts').toArray());
				});
			});
		}).on('init'),
		actions: {
			edit: function edit() {
				_ember['default'].$('#modal-trigger').click();
			}
		}

	});
});