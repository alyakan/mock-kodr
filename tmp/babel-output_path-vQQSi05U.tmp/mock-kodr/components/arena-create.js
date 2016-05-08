define('mock-kodr/components/arena-create', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
	exports['default'] = _ember['default'].Component.extend({
		session: _ember['default'].inject.service('session'),
		current_user: (0, _emberLocalStorage.storageFor)('current_user'),
		store: null,
		actions: {
			toggleForm: function toggleForm() {
				_ember['default'].$('.collapse').collapse("toggle");
				_ember['default'].$('#toggle-btn').toggle();
			},
			save: function save() {
				var that = this;
				var arena = this.getProperties('name', 'description');
				var pre_id = _ember['default'].$('#prerequisit').val();
				if (pre_id !== "None") {
					this.store.findRecord('arena', pre_id).then(function (p) {
						arena.prerequisit = p.id;
						arena.mock = true;
						console.log(arena);
						$.ajaxSetup({
							headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
						});
						_ember['default'].$.ajax({
							url: '/api/arenas',
							type: 'POST',
							data: {
								arena: arena
							}
						}).then(function (response) {
							that.store.createRecord('arena', arena);
							console.log(response);
						});
					});
				} else {
					arena.mock = true;
					$.ajaxSetup({
						headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
					});
					_ember['default'].$.ajax({
						url: '/api/arenas',
						type: 'POST',
						data: {
							arena: arena
						}
					}).then(function (response) {
						that.store.createRecord('arena', arena);
						console.log(response);
					});
				}

				//arena.prerequisit = this.store.findRecord('arena', Ember.$('#prerequisit').val());
			}
		}
	});
});