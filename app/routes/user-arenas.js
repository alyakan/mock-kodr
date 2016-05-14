import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { storageFor } from 'ember-local-storage';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	current_user: storageFor('current_user'),
	model: function() {
		return this.store.query('userArena', {'user':this.get('current_user.user.id'), 'mock':true});
	}
});
