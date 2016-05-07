import DS from 'ember-data';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	namespace: 'api',
	coalesceFindRequests: true,
	shouldReloadAll: function() {
		return true;
	},
	authorizer: 'authorizer:oauth2'
});
