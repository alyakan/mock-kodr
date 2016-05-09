define('mock-kodr/components/challenge-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		store: null,
		challenge: null,
		concepts: [],
		trigger: (function () {
			var that = this;
			_ember['default'].run.scheduleOnce('afterRender', this, function () {
				this.store.findRecord('challenge', this.get('challenge').get('id')).then(function (ch) {
					that.set('challenge', ch);
					that.set('concepts', ch.get('concepts'));
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