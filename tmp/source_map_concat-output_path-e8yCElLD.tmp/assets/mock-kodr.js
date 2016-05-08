"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('mock-kodr/adapters/application', ['exports', 'ember-data', 'mock-kodr/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _mockKodrConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].RESTAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		namespace: 'api',
		coalesceFindRequests: true,
		shouldReloadAll: function shouldReloadAll() {
			return true;
		},
		authorizer: 'authorizer:oauth2'
	});
});
define('mock-kodr/app', ['exports', 'ember', 'mock-kodr/resolver', 'ember-load-initializers', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrResolver, _emberLoadInitializers, _mockKodrConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _mockKodrConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockKodrConfigEnvironment['default'].podModulePrefix,
    Resolver: _mockKodrResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _mockKodrConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('mock-kodr/authenticators/custom', ['exports', 'ember', 'mock-kodr/authenticators/oauth2', 'ember-local-storage'], function (exports, _ember, _mockKodrAuthenticatorsOauth2, _emberLocalStorage) {
    exports['default'] = _mockKodrAuthenticatorsOauth2['default'].extend({
        session: _ember['default'].inject.service('session'),
        current_user: (0, _emberLocalStorage.storageFor)('current_user'),
        authenticate: function authenticate(credentials) {
            var that = this;
            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                // make the request to authenticate the user at endpoint /v3/token

                _ember['default'].$.ajax({
                    url: '/token',
                    type: 'POST',
                    data: {
                        grant_type: 'password',
                        identification: credentials.identification,
                        password: credentials.password
                    }
                }).then(function (response) {
                    _ember['default'].run(function () {
                        // resolve (including the user id) as the AJAX request was successful; all properties this promise resolves
                        // with will be available through the session
                        console.log(response);
                        that.set('current_user.id', response.user_id);
                        that.set('current_user.token', response.token);
                        that.set('current_user.email', response.email);
                        that.set('current_user.username', response.username);
                        $.ajaxSetup({
                            headers: { 'X-K-Authorization': 'Bearer ' + response.token }
                        });
                        resolve({
                            access_token: response.access_token,
                            user_id: response.user_id
                        });
                    });
                }, function (xhr) {
                    _ember['default'].run(function () {
                        reject(xhr.responseText);
                    });
                });
            });
        }
    });
});
define('mock-kodr/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant) {
  exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend();
});
define('mock-kodr/authorizers/oauth2', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('mock-kodr/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'mock-kodr/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _mockKodrConfigEnvironment) {

  var name = _mockKodrConfigEnvironment['default'].APP.name;
  var version = _mockKodrConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('mock-kodr/components/arena-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('mock-kodr/components/arena-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('mock-kodr/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('mock-kodr/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('mock-kodr/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('mock-kodr/components/login-page', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      },
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        var credentials = this.getProperties('identification', 'password');
        this.get('session').authenticate('authenticator:custom', credentials)['catch'](function (reason) {
          _this.set('errorMessage', reason.error || reason);
        });
      }

    }
  });
});
define('mock-kodr/controllers/application', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    actions: {
      session: _ember['default'].inject.service('session'),
      invalidateSession: function invalidateSession() {
        _ember['default'].$.ajax({
          type: 'DELETE',
          url: '/logout'
        });
        this.set('current_user', null);
        this.get('session').invalidate();
      }
    }
  });
});
define('mock-kodr/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('mock-kodr/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('mock-kodr/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('mock-kodr/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('mock-kodr/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'mock-kodr/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _mockKodrConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_mockKodrConfigEnvironment['default'].APP.name, _mockKodrConfigEnvironment['default'].APP.version)
  };
});
define('mock-kodr/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('mock-kodr/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mock-kodr/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('mock-kodr/initializers/ember-simple-auth', ['exports', 'ember', 'mock-kodr/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _mockKodrConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _mockKodrConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _mockKodrConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('mock-kodr/initializers/export-application-global', ['exports', 'ember', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_mockKodrConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _mockKodrConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_mockKodrConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('mock-kodr/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mock-kodr/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('mock-kodr/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('mock-kodr/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("mock-kodr/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('mock-kodr/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('mock-kodr/models/arena', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data'], function (exports, _emberDataModel, _emberDataAttr, _emberData) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    description: (0, _emberDataAttr['default'])('string'),
    isPublished: (0, _emberDataAttr['default'])('boolean')
  });
});
// challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),
define('mock-kodr/models/user-arena', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {

   var attr = _emberData['default'].attr;

   exports['default'] = _emberData['default'].Model.extend({
      exp: attr('number'),
      completed: attr('number'),
      complete: attr('boolean'),
      user: _emberData['default'].belongsTo('user', { inverse: 'userArenas', async: true }),
      locked: attr('boolean'),
      prerequisit: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true }),
      progress: _ember['default'].computed('trials', 'completed', function () {
         // Number of completed trials / Total number of trials
         var prog = this.get('completed') / this.get('trials').toArray().length * 100;
         return Math.round(prog);
      }).property('progress')
   });
});
// trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),
define('mock-kodr/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string')
  });
});
define('mock-kodr/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('mock-kodr/router', ['exports', 'ember', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _mockKodrConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('arenas');
    this.route('user-arenas');
  });

  exports['default'] = Router;
});
define('mock-kodr/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {});
});
define('mock-kodr/routes/arenas', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model() {
			return this.store.findAll('arena');
		}
	});
});
define('mock-kodr/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('mock-kodr/routes/user-arenas', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model() {
			return this.store.findAll('userArena');
		}
	});
});
define('mock-kodr/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {

    var ApplicationSerializer = _emberData['default'].RESTSerializer.extend({
        primaryKey: '_id'
    });

    exports['default'] = ApplicationSerializer;
});
define('mock-kodr/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('mock-kodr/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('mock-kodr/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define('mock-kodr/sessions/custom', ['exports', 'simple-auth/session', 'ember', 'ember-data'], function (exports, _simpleAuthSession, _ember, _emberData) {
    exports['default'] = _simpleAuthSession['default'].extend({
        user: (function () {
            var userId = this.get('secure.user_id');
            if (!_ember['default'].isEmpty(userId)) {
                return _emberData['default'].PromiseObject.create({
                    promise: this.container.lookup('service:store').findRecord('user', userId)
                });
            }
        }).property('secure.user_id'),
        atLeastTeacher: (function () {
            return this.get('isAdmin') || this.get('isTeacher');
        }).property('user.role'),
        isAdmin: (function () {
            return this.get('user.isAdmin');
        }).property('user.role'),
        isTeacher: (function () {
            return this.get('user.isTeacher');
        }).property('user.role'),
        isStudent: (function () {
            return this.get('user.isStudent');
        }).property('user.role')
    });
});
define('mock-kodr/storages/current-user', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {

  var Storage = _emberLocalStorageLocalObject['default'].extend();

  // Uncomment if you would like to set initialState
  // Storage.reopenClass({
  //   initialState() {
  //     return {};
  //   }
  // });

  exports['default'] = Storage;
});
define("mock-kodr/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 8
            },
            "end": {
              "line": 20,
              "column": 8
            }
          },
          "moduleName": "mock-kodr/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-gamepad");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" Arenas\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 8
            },
            "end": {
              "line": 25,
              "column": 8
            }
          },
          "moduleName": "mock-kodr/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-gamepad");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" User Arenas\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 6
            },
            "end": {
              "line": 36,
              "column": 6
            }
          },
          "moduleName": "mock-kodr/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-user");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("samp");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-sign-out");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" Logout");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 2]), 0, 0);
          morphs[1] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["content", "current_user.username", ["loc", [null, [31, 54], [31, 79]]]], ["element", "action", ["invalidateSession"], [], ["loc", [null, [34, 22], [34, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 6
            },
            "end": {
              "line": 43,
              "column": 6
            }
          },
          "moduleName": "mock-kodr/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-user-plus");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" Sign Up");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-sign-in");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" Login");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 55,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-inverse navbar-fixed-top");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "navbar-brand");
        dom.setAttribute(el4, "href", "#");
        var el5 = dom.createTextNode("Kodr");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "nav navbar-nav");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "nav navbar-nav navbar-right");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("      \n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Welcome to Kodr");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var element2 = dom.childAt(element1, [4]);
        var element3 = dom.childAt(fragment, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [6]), 1, 1);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(element3, 5, 5);
        return morphs;
      },
      statements: [["block", "link-to", ["arenas"], [], 0, null, ["loc", [null, [18, 8], [20, 20]]]], ["block", "link-to", ["user-arenas"], [], 1, null, ["loc", [null, [23, 8], [25, 20]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [29, 12], [29, 35]]]]], [], 2, 3, ["loc", [null, [29, 6], [43, 13]]]], ["content", "outlet", ["loc", [null, [50, 3], [50, 13]]]], ["inline", "login-page", [], ["store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [51, 23], [51, 28]]]]], [], []]], ["loc", [null, [51, 4], [51, 30]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("mock-kodr/templates/arenas", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/arenas.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "arena-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 19], [1, 24]]]]], [], []]], ["loc", [null, [1, 0], [1, 26]]]], ["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/components/arena-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/arena-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("style");
        dom.setAttribute(el1, "type", "text/css");
        var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "list-group-item");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        dom.setAttribute(el2, "class", "list-group-item-heading");
        var el3 = dom.createTextNode("\n		\n	\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "pull-right");
        var el4 = dom.createTextNode("\n			\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "");
        dom.setAttribute(el4, "class", "btn-primary btn-sm");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-play");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" Try\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("kbd");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2, "class", "list-group-item-text");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "progress");
        var el3 = dom.createTextNode("\n	  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "progress-bar progress-bar-success progress-bar-striped");
        dom.setAttribute(el3, "role", "progressbar");
        dom.setAttribute(el3, "aria-valuenow", "70");
        dom.setAttribute(el3, "aria-valuemin", "0");
        dom.setAttribute(el3, "aria-valuemax", "100");
        dom.setAttribute(el3, "style", "width:70%");
        var el4 = dom.createTextNode("\n	    70%\n	  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "arena.name", ["loc", [null, [20, 7], [20, 21]]]], ["content", "arena.description", ["loc", [null, [22, 33], [22, 54]]]], ["content", "yield", ["loc", [null, [32, 0], [32, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/components/arena-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "mock-kodr/templates/components/arena-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "arena-item", [], ["arena", ["subexpr", "@mut", [["get", "arena", ["loc", [null, [9, 24], [9, 29]]]]], [], []]], ["loc", [null, [9, 5], [9, 31]]]]],
        locals: ["arena"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 6
          }
        },
        "moduleName": "mock-kodr/templates/components/arena-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n	  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Arenas");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-12");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "list-group");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [3, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [8, 12], [8, 17]]]]], [], 0, null, ["loc", [null, [8, 4], [10, 13]]]], ["content", "yield", ["loc", [null, [14, 1], [14, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mock-kodr/templates/components/login-page", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 3
            },
            "end": {
              "line": 7,
              "column": 1
            }
          },
          "moduleName": "mock-kodr/templates/components/login-page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	  	You are logged in ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "current_user.username", ["loc", [null, [3, 22], [3, 47]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 3
              },
              "end": {
                "line": 17,
                "column": 4
              }
            },
            "moduleName": "mock-kodr/templates/components/login-page.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "errorMessage", ["loc", [null, [16, 9], [16, 25]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 1
            },
            "end": {
              "line": 19,
              "column": 1
            }
          },
          "moduleName": "mock-kodr/templates/components/login-page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "page-header");
          var el2 = dom.createTextNode("\n		    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("Sign in");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          dom.setAttribute(el1, "class", "form-group");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "type", "submit");
          dom.setAttribute(el2, "class", "btn btn-primary btn-block");
          dom.setAttribute(el2, "type", "submit");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-unlock-alt");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" Login");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3]);
          var morphs = new Array(4);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 4, 4);
          morphs[3] = dom.createMorphAt(element0, 9, 9);
          return morphs;
        },
        statements: [["element", "action", ["authenticate"], ["on", "submit"], ["loc", [null, [11, 27], [11, 64]]]], ["inline", "input", [], ["id", "identification", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [12, 37], [12, 51]]]]], [], []], "class", "form-control", "placeholder", "Login"], ["loc", [null, [12, 3], [12, 94]]]], ["inline", "input", [], ["id", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [13, 31], [13, 39]]]]], [], []], "class", "form-control", "placeholder", "Password", "type", "password"], ["loc", [null, [13, 3], [13, 101]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [15, 9], [15, 21]]]]], [], 0, null, ["loc", [null, [15, 3], [17, 11]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/login-page.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("  \n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [2, 9], [2, 32]]]]], [], 0, 1, ["loc", [null, [2, 3], [19, 8]]]], ["content", "yield", ["loc", [null, [22, 0], [22, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mock-kodr/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/user-arenas", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/user-arenas.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('mock-kodr/config/environment', ['ember'], function(Ember) {
  var prefix = 'mock-kodr';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("mock-kodr/app")["default"].create({"name":"mock-kodr","version":"0.0.0+a859eab5"});
}

/* jshint ignore:end */
//# sourceMappingURL=mock-kodr.map