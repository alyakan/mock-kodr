import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(params) {
		var router = this;
		this.store.query('challenge', {arena: params.arena_id}).then(function(c) {
			router.controllerFor('arena').set('challenges', c.toArray());
		})
		return this.store.findRecord('arena', params.arena_id);
	}
});
