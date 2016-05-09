define('mock-kodr/components/challenge-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		store: null,
		actions: {
			edit: function edit() {
				_ember['default'].$('#modal-trigger').click();
			}
		}

	});
});