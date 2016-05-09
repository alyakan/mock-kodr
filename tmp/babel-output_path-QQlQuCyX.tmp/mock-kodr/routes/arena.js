define('mock-kodr/routes/arena', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model(params) {
			var router = this;
			this.store.query('challenge', { arena: params.arena_id }).then(function (c) {
				router.controllerFor('arena').set('challenges', c.toArray());
			});
			return this.store.findRecord('arena', params.arena_id);
		}
	});
});