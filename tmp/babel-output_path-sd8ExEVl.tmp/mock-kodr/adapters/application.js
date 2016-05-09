define('mock-kodr/adapters/application', ['exports', 'ember-data', 'mock-kodr/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _mockKodrConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].RESTAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		namespace: 'api',
		authorizer: 'authorizer:oauth2',
		coalesceFindRequests: true,
		shouldReloadAll: function shouldReloadAll() {
			return true;
		}

	});
});