"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

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
                        that.set('current_user.id', response.user_id);
                        that.set('current_user.token', response.token);
                        that.set('current_user.email', response.email);
                        that.set('current_user.username', response.username);
                        that.set('current_user.atLeastTeacher', response.user.role === 'admin' || response.user.role === 'teacher');
                        that.set('current_user.user', response.user);

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
					});
				}

				//arena.prerequisit = this.store.findRecord('arena', Ember.$('#prerequisit').val());
			}
		}
	});
});
define('mock-kodr/components/arena-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('mock-kodr/components/arena-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('mock-kodr/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('mock-kodr/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('mock-kodr/components/challenge-create', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    actions: {
      toggleForm: function toggleForm() {
        _ember['default'].$('.collapse').collapse("toggle");
        _ember['default'].$('#toggle-btn').toggle();
      },
      save: function save() {
        var that = this;
        var challenge = this.getProperties('name', 'exp');
        var pre_id = _ember['default'].$('#prerequisit').val();
        challenge.arena = this.get('arena').id;
        challenge.mock = true;
        challenge.isPublished = true;
        challenge.flags = {
          beta: false
        };
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/challenges',
          type: 'POST',
          data: {
            challenge: challenge
          }
        }).then(function (response) {
          that.store.createRecord('challenge', challenge);
        });
      }
    }
  });
});
define('mock-kodr/components/challenge-edit', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    // session: Ember.inject.service('session'),
    //  current_user: storageFor('current_user'),
    //  arena: null,
    //  store: null,
    //  challenge: null,
    //  actions: {

    //  	toggleForm: function() {
    //  		Ember.$('.collapse').collapse("toggle");
    //  		Ember.$('#toggle-btn').toggle();
    //  	},
    //  	save: function() {
    //  		var that = this;
    //  		var challenge = this.getProperties('name', 'exp');
    // 		$.ajaxSetup({
    // 		    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
    // 		});
    // 		Ember.$.ajax({
    //        url: '/api/challenges',
    //        type: 'PUT',
    //        data: {
    //          challenge: challenge
    //        }
    //      }).then(function(response) {
    //      	that.store.updateRecord('challenge', response.challenge);
    //      })

    //  	}
    //  }
  });
});
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
define('mock-kodr/components/challenge-list', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		store: null
	});
});
define('mock-kodr/components/concept-create', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    actions: {
      toggleForm: function toggleForm() {
        _ember['default'].$('.collapse').collapse("toggle");
        _ember['default'].$('#toggle-btn').toggle();
      },
      save: function save() {
        var that = this;
        var concept = this.getProperties('name', 'max_exp');
        concept.author = this.get('current_user.user');
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/concepts',
          type: 'POST',
          data: {
            concept: concept
          }
        }).then(function (response) {
          that.store.createRecord('concept', response.concept);
        });
      }
    }
  });
});
define('mock-kodr/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
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
define('mock-kodr/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('mock-kodr/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('mock-kodr/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('mock-kodr/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('mock-kodr/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('mock-kodr/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
define("mock-kodr/components/user-arena-item", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({
		arena: _ember["default"].computed.alias("controllers.userArena.arena")
	});
});
define('mock-kodr/components/user-arena-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
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
define('mock-kodr/controllers/arena', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		challenges: null
	});
});
define('mock-kodr/controllers/arenas', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({});
});
define('mock-kodr/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('mock-kodr/controllers/challenge/edit', ['exports', 'ember', 'ember-local-storage', 'lodash/lodash'], function (exports, _ember, _emberLocalStorage, _lodashLodash) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    challenge: null,
    concepts: [],
    chosenConcepts: [],
    trigger: (function () {
      var arr = [];
      var that = this;
      this.store.findAll('concept').then(function (cons) {
        cons.map(function (c) {
          arr.push({
            name: c.get('name'),
            id: c.get('id')
          });
        });
        that.set('concepts', arr);
      });

      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        _ember['default'].$('#modal-trigger').click();
      });
    }).on('init'),
    actions: {

      toggleForm: function toggleForm() {
        _ember['default'].$('.collapse').collapse("toggle");
        _ember['default'].$('#toggle-btn').toggle();
      },
      save: function save() {
        var that = this;
        var challenge = {};
        challenge.name = _ember['default'].$('#name-edit').val();
        challenge.exp = _ember['default'].$('#exp-edit').val();
        var cons = _lodashLodash['default'].map(this.get('chosenConcepts'), function (con) {
          return con.id;
        });
        challenge.concepts = cons;
        console.log(challenge);
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/challenges/' + that.get('model').get('id'),
          type: 'PUT',
          data: {
            challenge: challenge
          }
        }).then(function (response) {
          that.store.findRecord('challenge', that.get('model').get('id')).then(function (ch) {
            ch.set('name', ch.get('name'));
            ch.set('exp', ch.get('exp'));
            ch.set('concepts', ch.get('concepts'));
            _ember['default'].$('.close').click();
          });
        });
      },
      closeModal: function closeModal() {
        console.log();
        this.transitionToRoute('arena', { arena_id: this.get('model').get('arena').get('id') });
      }
    }
  });
});
define('mock-kodr/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('mock-kodr/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/ember-power-select-build-selection', ['exports', 'ember-power-select/helpers/ember-power-select-build-selection'], function (exports, _emberPowerSelectHelpersEmberPowerSelectBuildSelection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectBuildSelection', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectBuildSelection.emberPowerSelectBuildSelection;
    }
  });
});
define('mock-kodr/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('mock-kodr/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('mock-kodr/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('mock-kodr/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('mock-kodr/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
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
define('mock-kodr/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt', 'ember-simple-auth-token/authorizers/token', 'ember-simple-auth-token/configuration', 'mock-kodr/config/environment'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken, _emberSimpleAuthTokenAuthenticatorsJwt, _emberSimpleAuthTokenAuthorizersToken, _emberSimpleAuthTokenConfiguration, _mockKodrConfigEnvironment) {

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  exports['default'] = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      _emberSimpleAuthTokenConfiguration['default'].load(container, _mockKodrConfigEnvironment['default']['ember-simple-auth-token'] || {});
      container.register('authorizer:token', _emberSimpleAuthTokenAuthorizersToken['default']);
      container.register('authenticator:token', _emberSimpleAuthTokenAuthenticatorsToken['default']);
      container.register('authenticator:jwt', _emberSimpleAuthTokenAuthenticatorsJwt['default']);
    }
  };
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
define('mock-kodr/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
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

  var Arena = _emberData['default'].Model.extend({
    name: (0, _emberDataAttr['default'])('string', {
      defaultValue: "Still Loading"
    }),
    description: (0, _emberDataAttr['default'])('string', {
      defaultValue: "Isn't life a beautifule thing"
    }),
    flow: (0, _emberDataAttr['default'])('string', {
      defaultValue: "sequential"
    }),
    mock: (0, _emberDataAttr['default'])('boolean', {
      defaultValue: false
    }),
    hasPrerequisit: Ember.computed('prerequisit', function () {
      console.log(this.get('prerequisit'));
      if (this.get('prerequisit') !== null) return true;
      return false;
    }).property('hasPrerequisit'),
    isPublished: (0, _emberDataAttr['default'])('boolean', { defaultValue: false }),
    author: _emberData['default'].belongsTo('user', { async: true, inverse: 'arenas' }),
    prerequisit: _emberData['default'].belongsTo('arena', { defaultValue: null }),
    trials: _emberData['default'].hasMany('trial', { async: true, inverse: 'arena' }),
    users: _emberData['default'].hasMany('userArena', { async: true, inverse: 'arena' }),
    challenges: _emberData['default'].hasMany('challenge', { async: true, inverse: 'arena' })
  });

  // Arena.reopen({
  //   validations: {
  //     name: {
  //       presence: true,
  //       length: {
  //           minimum: 5
  //       }
  //     },
  //     description: {
  //       presence: true,
  //       length: {
  //           minimum: 6
  //       }
  //     }
  //   }
  // });

  exports['default'] = Arena;
});
define('mock-kodr/models/challenge', ['exports', 'ember-data', 'mock-kodr/models/mixed'], function (exports, _emberData, _mockKodrModelsMixed) {

    var attr = _emberData['default'].attr;
    exports['default'] = _emberData['default'].Model.extend({
        name: attr('string', {
            defaultValue: "New Challenge"
        }),
        type: attr('string', {
            defaultValue: 'python'
        }),
        order: attr('number', {
            defaultValue: 0
        }),
        group: attr('string', {
            defaultValue: null
        }),
        exp: attr('number', {
            defaultValue: 0
        }),
        // blueprint: attr('mixed', {
        //     defaultValue: function(model) {
        //         var obj = {};
        //         switch(model.get("type")){
        //         case "python":
        //             obj = {
        //                 language:"python",
        //                 description:"",
        //                 solution:"",
        //                 setup:"",
        //                 tests:"",
        //             };
        //             break;
        //         }
        //         return Mixed.create(obj);
        //     }
        // }),

        // "import": attr('string'),
        // inputs: attr('javaInput', {
        //     defaultValue: []
        // }),
        isPublished: attr('boolean', {
            defaultValue: false
        }),
        //flags: attr('mixed', {defaultValue:{beta:true}}),
        valid: attr('boolean', {
            defaultValue: false
        }),
        arena: _emberData['default'].belongsTo('arena', {
            async: true,
            inverse: 'challenges'
        }),
        author: _emberData['default'].belongsTo('user', {
            async: true,
            inverse: 'challenges'
        }),
        concepts: _emberData['default'].hasMany('concept', {
            async: true,
            inverse: 'challenges'
        }),

        expOptions: [{
            rank: 'none',
            points: 0
        }, {
            rank: "direct",
            points: 10
        }, {
            rank: "simple",
            points: 20
        }, {
            rank: "easy",
            points: 40
        }, {
            rank: "medium",
            points: 80
        }, {
            rank: "challenging",
            points: 160
        }, {
            rank: "hard",
            points: 320
        }],

        mock: attr('boolean'),

        isJava: (function () {
            return this.get('type') === 'java';
        }).property('type'),
        isJS: (function () {
            return this.get('type') === 'javascript';
        }).property('type'),
        isPython: (function () {
            return this.get('type') === 'python';
        }).property('type'),

        // relationshipChanged: false,
        canSave: (function () {
            return !this.get('isSaving') && this.get('hasDirtyAttributes') || this.get('isNew') || this.get('contentChanged');
        }).property('hasDirtyAttributes', 'isSaving', 'isNew', 'contentChanged'),
        canReset: (function () {
            return !this.get('isSaving') && this.get('hasDirtyAttributes') && !this.get('isNew');
        }).property('hasDirtyAttributes', 'isSaving'),
        canPublish: (function () {
            return !this.get('canSave') && !this.get('isPublished') && this.get('valid');
        }).property('canSave'),

        contentChanged: false,
        set: function set(keyName, value) {
            this._super(keyName, value);
            if (keyName.indexOf('blueprint.') > -1) {
                // a property of `blueprint` has changed => notify observers of `blueprint`
                // this.notifyPropertyChange(keyName);
                this.set('contentChanged', true);
            }
        }

    });
});
define('mock-kodr/models/concept', ['exports', 'ember-data/model', 'ember-data'], function (exports, _emberDataModel, _emberData) {
  var attr = _emberData['default'].attr;
  var hasMany = _emberData['default'].hasMany;
  exports['default'] = _emberData['default'].Model.extend({
    name: attr('string'),
    max_exp: attr('number', {
      defaultValue: 10
    }),
    author: _emberData['default'].belongsTo('user', {
      async: true,
      inverse: 'concepts'
    }),
    challenges: hasMany('challenge', { async: true, inverse: 'concepts' })
  });
});
define('mock-kodr/models/mixed', ['exports', 'ember'], function (exports, _ember) {
    var _ = window._;

    exports['default'] = _ember['default'].Object.extend({
        propertyKeys: [],
        original: {},
        init: function init() {
            this.set('propertyKeys', Object.keys(this.__ember_meta__.proto));
            this.set('original', this.__ember_meta__.proto);
            this._super.apply(this, arguments);
        },
        set: function set(path, value) {
            this._super.apply(this, arguments);
            if (value === undefined) {
                delete this[path];
                _.pull(this.propertyKeys, path);
            } else {
                this.propertyKeys = _.union(this.propertyKeys, [path]);
            }
        },
        setProperties: function setProperties(obj) {
            this._super.apply(this, arguments);
            this.propertyKeys = _.union(this.propertyKeys, _.keys(_.filter(obj, undefined)));
        },
        toJSON: function toJSON() {
            var propertyKeys = _.chain(this.propertyKeys).pull('original').pull('propertyKeys').value();
            return this.getProperties(propertyKeys);
        }
    });
});
define('mock-kodr/models/trial', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        work: _emberData['default'].attr('mixed'),
        blueprint: _emberData['default'].attr('mixed'),
        times: _emberData['default'].attr('number'),
        exp: _emberData['default'].attr('number'),
        order: _emberData['default'].attr('number'),
        started: _emberData['default'].attr('boolean'),
        startTime: _emberData['default'].attr('date'),
        endTime: _emberData['default'].attr('date'),
        complete: _emberData['default'].attr('boolean'),
        completed: _emberData['default'].attr('number'),
        report: _emberData['default'].attr(),
        challenge: _emberData['default'].belongsTo('challenge', { async: true }),
        user: _emberData['default'].belongsTo('user'),
        arena: _emberData['default'].belongsTo('arena'),
        userArena: _emberData['default'].belongsTo('userArena'),

        canSubmit: (function () {
            return !this.get('complete') || this.get('hasDirtyAttributes') || this.get('contentChanged');
        }).property('complete', 'hasDirtyAttributes', 'contentChanged'),

        contentChanged: false,
        save: function save() {
            this.set('contentChanged', false);
            return this._super.apply(this, arguments);
        },
        set: function set(keyName, value) {
            this._super(keyName, value);
            if (keyName.indexOf('blueprint.') > -1 || keyName.indexOf('work.') > -1) {
                // a property of `blueprint` has changed => notify observers of `blueprint`
                // this.notifyPropertyChange(keyName);
                this.set('contentChanged', true);
            }
        }
    });
});
define('mock-kodr/models/user-arena', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {

  var attr = _emberData['default'].attr;

  exports['default'] = _emberData['default'].Model.extend({
    exp: attr('number'),
    completed: attr('number'),
    complete: attr('boolean'),
    locked: attr('boolean'),
    progress: _ember['default'].computed('trials', 'completed', function () {
      // Number of completed trials / Total number of trials

      var prog = this.get('completed') / this.get('trials').toArray().length * 100;
      console.log(_ember['default'].typeOf(prog));
      if (prog > 0) var a = 0;else prog = 0;
      return Math.round(prog);
    }).property('progress'),
    prerequisit: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true }),
    trials: _emberData['default'].hasMany('trials', { inverse: 'userArena', async: true }),
    user: _emberData['default'].belongsTo('user', { inverse: 'userArenas', async: true }),
    arena: _emberData['default'].belongsTo('arena', { inverse: 'users', async: true })
  });
});
// trials: DS.hasMany('trials', {inverse: 'userArena', async:true}),
define('mock-kodr/models/user', ['exports', 'ember-data'], function (exports, _emberData) {

  var attr = _emberData['default'].attr;
  var hasMany = _emberData['default'].hasMany;

  exports['default'] = _emberData['default'].Model.extend({
    uniId: attr('string'),
    username: attr('string'),
    email: attr('string'),
    exp: attr('number', { defaultValue: 0 }),
    rp: attr('number', { defaultValue: 0 }),
    role: attr('string'),
    activated: attr('boolean'),
    labGroup: attr('string'),
    lectureGroup: attr('string'),
    userArenas: hasMany('userArena', { async: true, inverse: 'user' }),
    trials: hasMany('trial', { async: true, inverse: 'user' }),
    arenas: hasMany('arena', { async: true, inverse: 'author' }),
    challenges: hasMany('challenge', { async: true, inverse: 'author' }),
    concepts: hasMany('concept', { async: true, inverse: 'author' }),
    atLeastTeacher: Ember.computed('role', function () {
      return this.get('role') === 'admin' || this.get('role') === 'teacher';
    }).property('atLeastTeacher')
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
    this.resource('arenas', {
      path: '/arenas'
    }, function () {
      this.route('create');
    });
    this.resource('userArenas', {
      path: '/user-arenas'
    });
    this.resource('arena', {
      path: '/arenas/:arena_id'
    }, function () {
      this.route('edit');
      this.resource('challenge', {
        path: 'challenge/:challenge_id'
      }, function () {
        this.route('edit');
        this.route('try');
        this.route('copy');
      });
      this.resource('challenges', {
        path: 'challenge'
      }, function () {
        this.route('create');
      });
    });
    this.resource('concepts');
  });

  exports['default'] = Router;
});
define('mock-kodr/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {});
});
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
define('mock-kodr/routes/arenas', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model() {
			return this.store.findAll('arena');
		}
	});
});
define('mock-kodr/routes/concepts', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('concept');
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
              "line": 19,
              "column": 8
            },
            "end": {
              "line": 21,
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
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 25,
                "column": 10
              },
              "end": {
                "line": 27,
                "column": 10
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
            var el1 = dom.createTextNode("            ");
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
                "line": 30,
                "column": 10
              },
              "end": {
                "line": 32,
                "column": 10
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
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "fa fa-tags");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" Concepts\n");
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
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 6
            },
            "end": {
              "line": 34,
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
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["arenas"], [], 0, null, ["loc", [null, [25, 10], [27, 22]]]], ["block", "link-to", ["concepts"], [], 1, null, ["loc", [null, [30, 10], [32, 22]]]]],
        locals: [],
        templates: [child0, child1]
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
              "line": 37,
              "column": 6
            },
            "end": {
              "line": 44,
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
        statements: [["content", "current_user.username", ["loc", [null, [39, 54], [39, 79]]]], ["element", "action", ["invalidateSession"], [], ["loc", [null, [42, 22], [42, 52]]]]],
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
              "line": 44,
              "column": 6
            },
            "end": {
              "line": 51,
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
            "line": 63,
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
        dom.setAttribute(el4, "href", "/");
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
        var el4 = dom.createTextNode("\n      \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
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
        morphs[1] = dom.createMorphAt(element2, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [6]), 1, 1);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(element3, 5, 5);
        return morphs;
      },
      statements: [["block", "link-to", ["userArenas"], [], 0, null, ["loc", [null, [19, 8], [21, 20]]]], ["block", "if", [["get", "current_user.atLeastTeacher", ["loc", [null, [23, 12], [23, 39]]]]], [], 1, null, ["loc", [null, [23, 6], [34, 13]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [37, 12], [37, 35]]]]], [], 2, 3, ["loc", [null, [37, 6], [51, 13]]]], ["content", "outlet", ["loc", [null, [58, 3], [58, 13]]]], ["inline", "login-page", [], ["store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [59, 23], [59, 28]]]]], [], []]], ["loc", [null, [59, 4], [59, 30]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("mock-kodr/templates/arena", ["exports"], function (exports) {
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
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/arena.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container text-center");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("style");
        dom.setAttribute(el1, "type", "text/css");
        var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 9, 9, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 11, 11, contextualElement);
        return morphs;
      },
      statements: [["content", "model.name", ["loc", [null, [3, 6], [3, 20]]]], ["content", "model.description", ["loc", [null, [5, 7], [5, 28]]]], ["inline", "challenge-create", [], ["arena", ["subexpr", "@mut", [["get", "model", ["loc", [null, [12, 25], [12, 30]]]]], [], []], "store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [12, 37], [12, 42]]]]], [], []]], ["loc", [null, [12, 0], [12, 44]]]], ["inline", "challenge-list", [], ["challenges", ["subexpr", "@mut", [["get", "challenges", ["loc", [null, [14, 28], [14, 38]]]]], [], []], "store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [14, 45], [14, 50]]]]], [], []]], ["loc", [null, [14, 0], [14, 52]]]], ["content", "outlet", ["loc", [null, [16, 0], [16, 10]]]]],
      locals: [],
      templates: []
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
            "line": 4,
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
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "arena-create", [], ["arenas", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 22], [1, 27]]]]], [], []], "store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [1, 34], [1, 39]]]]], [], []]], ["loc", [null, [1, 0], [1, 41]]]], ["inline", "arena-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [2, 19], [2, 24]]]]], [], []]], ["loc", [null, [2, 0], [2, 26]]]], ["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/challenge/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 4
            },
            "end": {
              "line": 30,
              "column": 7
            }
          },
          "moduleName": "mock-kodr/templates/challenge/edit.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			      ");
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
        statements: [["content", "concept.name", ["loc", [null, [29, 9], [29, 25]]]]],
        locals: ["concept"],
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
              "line": 37,
              "column": 4
            },
            "end": {
              "line": 39,
              "column": 5
            }
          },
          "moduleName": "mock-kodr/templates/challenge/edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			    ");
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
        statements: [["content", "errorMessage", ["loc", [null, [38, 10], [38, 26]]]]],
        locals: [],
        templates: []
      };
    })();
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
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/challenge/edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "id", "modal-trigger");
        dom.setAttribute(el1, "type", "button");
        dom.setAttribute(el1, "class", "btn btn-info btn-lg hidden");
        dom.setAttribute(el1, "data-toggle", "modal");
        dom.setAttribute(el1, "data-target", "#myModal");
        var el2 = dom.createTextNode("Open Modal");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" Modal ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "myModal");
        dom.setAttribute(el1, "class", "modal fade");
        dom.setAttribute(el1, "role", "dialog");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-dialog");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Modal content");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("×");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "modal-title");
        var el6 = dom.createTextNode("Edit Challenge: ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-body");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("form");
        dom.setAttribute(el5, "id", "challenge-edit-form");
        dom.setAttribute(el5, "class", "form-group");
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "name");
        var el7 = dom.createTextNode("Challenge Name:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "exp");
        var el7 = dom.createTextNode("Experience Points:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("Concepts:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "author");
        var el7 = dom.createTextNode("Author:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "arena");
        var el7 = dom.createTextNode("Arena:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "btn btn-success btn-block");
        dom.setAttribute(el6, "type", "submit");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "fa fa-plus-square-o");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" Save Challenge");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-footer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "btn btn-default");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("Close");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4, 1, 3]);
        var element1 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element1, 8, 8);
        morphs[4] = dom.createMorphAt(element1, 13, 13);
        morphs[5] = dom.createMorphAt(element1, 17, 17);
        morphs[6] = dom.createMorphAt(element1, 22, 22);
        morphs[7] = dom.createMorphAt(element1, 27, 27);
        morphs[8] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        return morphs;
      },
      statements: [["content", "model.name", ["loc", [null, [11, 48], [11, 62]]]], ["element", "action", ["save"], ["on", "submit"], ["loc", [null, [14, 58], [14, 87]]]], ["inline", "input", [], ["id", "name-edit", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [16, 33], [16, 43]]]]], [], []], "class", "form-control", "placeholder", "Challenge Name"], ["loc", [null, [16, 4], [16, 95]]]], ["inline", "input", [], ["id", "exp-edit", "value", ["subexpr", "@mut", [["get", "model.exp", ["loc", [null, [18, 32], [18, 41]]]]], [], []], "class", "form-control", "placeholder", "Experience Points", "type", "number"], ["loc", [null, [18, 4], [18, 110]]]], ["block", "power-select-multiple", [], ["options", ["subexpr", "@mut", [["get", "concepts", ["loc", [null, [21, 17], [21, 25]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "chosenConcepts", ["loc", [null, [22, 18], [22, 32]]]]], [], []], "placeholder", "Select some concepts...", "searchField", "name", "renderInPlace", true, "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "chosenConcepts", ["loc", [null, [26, 31], [26, 45]]]]], [], ["loc", [null, [26, 26], [26, 46]]]]], [], ["loc", [null, [26, 18], [26, 47]]]]], 0, null, ["loc", [null, [20, 4], [30, 33]]]], ["inline", "input", [], ["class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "current_user.username", ["loc", [null, [32, 55], [32, 76]]]]], [], []]], ["loc", [null, [32, 4], [32, 78]]]], ["inline", "input", [], ["class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "model.arena.name", ["loc", [null, [34, 55], [34, 71]]]]], [], []]], ["loc", [null, [34, 4], [34, 73]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [37, 10], [37, 22]]]]], [], 1, null, ["loc", [null, [37, 4], [39, 12]]]], ["content", "outlet", ["loc", [null, [51, 0], [51, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mock-kodr/templates/components/arena-create", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 6
            },
            "end": {
              "line": 19,
              "column": 6
            }
          },
          "moduleName": "mock-kodr/templates/components/arena-create.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "value", ["get", "arena.id", ["loc", [null, [18, 24], [18, 32]]]]], ["content", "arena.name", ["loc", [null, [18, 35], [18, 49]]]]],
        locals: ["arena"],
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
              "column": 4
            },
            "end": {
              "line": 25,
              "column": 5
            }
          },
          "moduleName": "mock-kodr/templates/components/arena-create.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			    ");
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
        statements: [["content", "errorMessage", ["loc", [null, [24, 10], [24, 26]]]]],
        locals: [],
        templates: []
      };
    })();
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
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/arena-create.hbs"
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
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "#");
        dom.setAttribute(el2, "id", "toggle-btn");
        dom.setAttribute(el2, "class", "btn btn-primary btn-block");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-plus-square-o");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Create Arena");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row collapse");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "form-group");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Arena Name:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "description");
        var el6 = dom.createTextNode("Description:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Author:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "prerequisit");
        var el6 = dom.createTextNode("Prerquisit:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5, "value", "prerequisit");
        dom.setAttribute(el5, "id", "prerequisit");
        dom.setAttribute(el5, "class", "form-control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "None");
        dom.setAttribute(el6, "selected", "True");
        var el7 = dom.createTextNode(" None");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "submit");
        dom.setAttribute(el5, "class", "btn btn-success btn-block");
        dom.setAttribute(el5, "type", "submit");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-plus-square-o");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Create Arena");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "btn btn-danger btn-block");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-cancel");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Cancel");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8 text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Create an Arena");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-gamepad fa-5x");
        dom.setAttribute(el5, "aria-hidden", "true");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element1, [5, 1, 1]);
        var element4 = dom.childAt(element3, [23]);
        var morphs = new Array(9);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createElementMorph(element3);
        morphs[2] = dom.createMorphAt(element3, 3, 3);
        morphs[3] = dom.createMorphAt(element3, 8, 8);
        morphs[4] = dom.createMorphAt(element3, 13, 13);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [18]), 3, 3);
        morphs[6] = dom.createElementMorph(element4);
        morphs[7] = dom.createMorphAt(element3, 25, 25);
        morphs[8] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["toggleForm"], [], ["loc", [null, [4, 29], [4, 52]]]], ["element", "action", ["save"], ["on", "submit"], ["loc", [null, [7, 28], [7, 57]]]], ["inline", "input", [], ["id", "name", "value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [9, 28], [9, 32]]]]], [], []], "class", "form-control", "placeholder", "Arena Name"], ["loc", [null, [9, 4], [9, 80]]]], ["inline", "input", [], ["id", "description", "value", ["subexpr", "@mut", [["get", "description", ["loc", [null, [11, 35], [11, 46]]]]], [], []], "class", "form-control", "placeholder", "Short Description"], ["loc", [null, [11, 4], [11, 101]]]], ["inline", "input", [], ["id", "author", "value", ["subexpr", "@mut", [["get", "author", ["loc", [null, [13, 30], [13, 36]]]]], [], []], "class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "current_user.username", ["loc", [null, [13, 80], [13, 101]]]]], [], []]], ["loc", [null, [13, 4], [13, 103]]]], ["block", "each", [["get", "arenas", ["loc", [null, [17, 14], [17, 20]]]]], [], 0, null, ["loc", [null, [17, 6], [19, 15]]]], ["element", "action", ["toggleForm"], [], ["loc", [null, [22, 15], [22, 38]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [23, 10], [23, 22]]]]], [], 1, null, ["loc", [null, [23, 4], [25, 12]]]], ["content", "yield", ["loc", [null, [37, 0], [37, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mock-kodr/templates/components/arena-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 3
            },
            "end": {
              "line": 16,
              "column": 12
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
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-play");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" Try\n");
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
              "line": 22,
              "column": 1
            },
            "end": {
              "line": 24,
              "column": 1
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
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("small");
          dom.setAttribute(el1, "class", "text-muted");
          var el2 = dom.createElement("em");
          var el3 = dom.createTextNode("Prerequisit: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("code");
          var el4 = dom.createElement("a");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0, 1, 0]), 0, 0);
          return morphs;
        },
        statements: [["content", "arena.prerequisit.name", ["loc", [null, [23, 54], [23, 80]]]]],
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
              "line": 24,
              "column": 1
            },
            "end": {
              "line": 26,
              "column": 1
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
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("small");
          dom.setAttribute(el1, "class", "text-muted");
          var el2 = dom.createElement("em");
          var el3 = dom.createTextNode("Prerequisit: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("code");
          var el4 = dom.createTextNode("None");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
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
            "line": 32,
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
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "list-group-item-heading");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2, "class", "list-group-item-text text-info");
        var el3 = dom.createComment("");
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
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1]), 0, 0);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["arena", ["get", "arena.id", ["loc", [null, [14, 22], [14, 30]]]]], ["class", "btn-primary btn-sm"], 0, null, ["loc", [null, [14, 3], [16, 24]]]], ["content", "arena.name", ["loc", [null, [19, 6], [19, 20]]]], ["block", "if", [["get", "arena.prerequisit", ["loc", [null, [22, 7], [22, 24]]]]], [], 1, 2, ["loc", [null, [22, 1], [26, 8]]]], ["content", "arena.description", ["loc", [null, [28, 43], [28, 64]]]], ["content", "yield", ["loc", [null, [31, 0], [31, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("mock-kodr/templates/components/arena-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 5
              },
              "end": {
                "line": 11,
                "column": 5
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
            var el1 = dom.createTextNode("						");
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
          statements: [["inline", "arena-item", [], ["arena", ["subexpr", "@mut", [["get", "arena", ["loc", [null, [10, 25], [10, 30]]]]], [], []]], ["loc", [null, [10, 6], [10, 32]]]]],
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
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 12,
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
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "arena.mock", ["loc", [null, [9, 11], [9, 21]]]]], [], 0, null, ["loc", [null, [9, 5], [11, 12]]]]],
        locals: ["arena"],
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
            "line": 17,
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
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-12");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "page-header");
        var el5 = dom.createTextNode("\n			  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        var el6 = dom.createTextNode("Arenas");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
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
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1, 3]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [8, 12], [8, 17]]]]], [], 0, null, ["loc", [null, [8, 4], [12, 13]]]], ["content", "yield", ["loc", [null, [16, 1], [16, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mock-kodr/templates/components/challenge-create", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 4
            },
            "end": {
              "line": 21,
              "column": 5
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-create.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			    ");
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
        statements: [["content", "errorMessage", ["loc", [null, [20, 10], [20, 26]]]]],
        locals: [],
        templates: []
      };
    })();
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
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/challenge-create.hbs"
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
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "#");
        dom.setAttribute(el2, "id", "toggle-btn");
        dom.setAttribute(el2, "class", "btn btn-primary btn-block");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-plus-square-o");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Add Challenge");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row collapse");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "form-group");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Challenge Name:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "description");
        var el6 = dom.createTextNode("Experience Points:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Author:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Arena:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "submit");
        dom.setAttribute(el5, "class", "btn btn-success btn-block");
        dom.setAttribute(el5, "type", "submit");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-plus-square-o");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Add  Challenge");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "btn btn-danger btn-block");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-cancel");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Cancel");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8 text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Add a Challenge");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-gamepad fa-5x");
        dom.setAttribute(el5, "aria-hidden", "true");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [5, 1, 1]);
        var element3 = dom.childAt(element2, [23]);
        var morphs = new Array(9);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createMorphAt(element2, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 8, 8);
        morphs[4] = dom.createMorphAt(element2, 13, 13);
        morphs[5] = dom.createMorphAt(element2, 18, 18);
        morphs[6] = dom.createElementMorph(element3);
        morphs[7] = dom.createMorphAt(element2, 25, 25);
        morphs[8] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["toggleForm"], [], ["loc", [null, [4, 29], [4, 52]]]], ["element", "action", ["save"], ["on", "submit"], ["loc", [null, [7, 28], [7, 57]]]], ["inline", "input", [], ["id", "name", "value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [9, 28], [9, 32]]]]], [], []], "class", "form-control", "placeholder", "Challenge Name"], ["loc", [null, [9, 4], [9, 84]]]], ["inline", "input", [], ["id", "exp", "value", ["subexpr", "@mut", [["get", "exp", ["loc", [null, [11, 27], [11, 30]]]]], [], []], "class", "form-control", "placeholder", "Experience Points", "type", "number"], ["loc", [null, [11, 4], [11, 99]]]], ["inline", "input", [], ["id", "author", "class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "current_user.username", ["loc", [null, [13, 67], [13, 88]]]]], [], []]], ["loc", [null, [13, 4], [13, 90]]]], ["inline", "input", [], ["id", "arena", "class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "arena.name", ["loc", [null, [15, 66], [15, 76]]]]], [], []]], ["loc", [null, [15, 4], [15, 78]]]], ["element", "action", ["toggleForm"], [], ["loc", [null, [18, 15], [18, 38]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [19, 10], [19, 22]]]]], [], 0, null, ["loc", [null, [19, 4], [21, 12]]]], ["content", "yield", ["loc", [null, [33, 0], [33, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mock-kodr/templates/components/challenge-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["empty-body"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 5
          }
        },
        "moduleName": "mock-kodr/templates/components/challenge-edit.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/components/challenge-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 13
            },
            "end": {
              "line": 17,
              "column": 10
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-primary btn-sm");
          var el2 = dom.createTextNode("\n		            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "fa fa-pencil-square-o");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" Edit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["edit"], [], ["loc", [null, [15, 60], [15, 77]]]]],
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
                "line": 31,
                "column": 11
              },
              "end": {
                "line": 33,
                "column": 11
              }
            },
            "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			        	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "label label-default");
            var el2 = dom.createElement("a");
            dom.setAttribute(el2, "href", "#");
            dom.setAttribute(el2, "style", "color: white");
            var el3 = dom.createElement("i");
            dom.setAttribute(el3, "class", "fa fa-tags");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 2, 2);
            return morphs;
          },
          statements: [["content", "concept.name", ["loc", [null, [32, 105], [32, 121]]]]],
          locals: ["concept"],
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
              "line": 30,
              "column": 10
            },
            "end": {
              "line": 34,
              "column": 7
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "challenge.concepts", ["loc", [null, [31, 19], [31, 37]]]]], [], 0, null, ["loc", [null, [31, 11], [33, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 36,
                  "column": 9
                },
                "end": {
                  "line": 38,
                  "column": 12
                }
              },
              "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("				        	");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "label label-default");
              var el2 = dom.createElement("a");
              dom.setAttribute(el2, "href", "#");
              dom.setAttribute(el2, "style", "color: white");
              var el3 = dom.createElement("i");
              dom.setAttribute(el3, "class", "fa fa-tags");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode(" ");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 0]), 2, 2);
              return morphs;
            },
            statements: [["content", "concept.name", ["loc", [null, [37, 106], [37, 122]]]]],
            locals: ["concept"],
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
                "line": 35,
                "column": 8
              },
              "end": {
                "line": 39,
                "column": 8
              }
            },
            "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "concepts", ["loc", [null, [36, 17], [36, 25]]]]], [], 0, null, ["loc", [null, [36, 9], [38, 21]]]]],
          locals: [],
          templates: [child0]
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
                "line": 39,
                "column": 8
              },
              "end": {
                "line": 41,
                "column": 11
              }
            },
            "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			        	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "label label-default");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-tags");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" No Tags");
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
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 7
            },
            "end": {
              "line": 42,
              "column": 7
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "concepts", ["loc", [null, [35, 14], [35, 22]]]]], [], 0, 1, ["loc", [null, [35, 8], [41, 18]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
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
            "line": 55,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/challenge-item.hbs"
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
        dom.setAttribute(el2, "class", "list-group-item");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "list-group-item-heading");
        var el4 = dom.createTextNode("\n			\n		\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "pull-right");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("	            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "challenge-discussion btn btn-info btn-sm");
        dom.setAttribute(el5, "href", "#");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-comment");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Discussion");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n	            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "");
        dom.setAttribute(el5, "class", "btn btn-primary btn-sm");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-play");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Try");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n	            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("	            \n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        dom.setAttribute(el4, "class", "list-group-item-heading");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "list-group-item-text");
        var el4 = dom.createTextNode("\n	            \n	        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        var el5 = dom.createTextNode("\n		        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("small");
        dom.setAttribute(el5, "class", "text-muted");
        var el6 = dom.createElement("em");
        var el7 = dom.createElement("code");
        var el8 = dom.createElement("a");
        var el9 = dom.createTextNode("Exp: ");
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n	            \n	            \n	        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n\n	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 6, 6);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3, 1]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1, 0, 0, 0]), 1, 1);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["challenge.edit", ["get", "challenge", ["loc", [null, [15, 41], [15, 50]]]]], [], 0, null, ["loc", [null, [15, 13], [17, 22]]]], ["content", "challenge.name", ["loc", [null, [22, 7], [22, 25]]]], ["content", "challenge.exp", ["loc", [null, [29, 54], [29, 71]]]], ["block", "if", [["get", "challenge.concepts", ["loc", [null, [30, 16], [30, 34]]]]], [], 1, 2, ["loc", [null, [30, 10], [42, 14]]]], ["content", "yield", ["loc", [null, [54, 0], [54, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("mock-kodr/templates/components/challenge-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
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
        statements: [["inline", "challenge-item", [], ["challenge", ["subexpr", "@mut", [["get", "challenge", ["loc", [null, [2, 31], [2, 40]]]]], [], []], "store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [2, 47], [2, 52]]]]], [], []]], ["loc", [null, [2, 4], [2, 54]]]]],
        locals: ["challenge"],
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
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "mock-kodr/templates/components/challenge-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("No Challanges set yet");
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
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/challenge-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "each", [["get", "challenges", ["loc", [null, [1, 8], [1, 18]]]]], [], 0, 1, ["loc", [null, [1, 0], [5, 9]]]], ["content", "yield", ["loc", [null, [6, 0], [6, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mock-kodr/templates/components/concept-create", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 4
            },
            "end": {
              "line": 19,
              "column": 4
            }
          },
          "moduleName": "mock-kodr/templates/components/concept-create.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
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
        statements: [["content", "errorMessage", ["loc", [null, [18, 8], [18, 24]]]]],
        locals: [],
        templates: []
      };
    })();
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
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/components/concept-create.hbs"
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
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "href", "#");
        dom.setAttribute(el2, "id", "toggle-btn");
        dom.setAttribute(el2, "class", "btn btn-primary btn-block");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-plus-square-o");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Add Concept");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row collapse");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "form-group");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Concept Name:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "description");
        var el6 = dom.createTextNode("Maximum Experience Points:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "name");
        var el6 = dom.createTextNode("Author:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "submit");
        dom.setAttribute(el5, "class", "btn btn-success btn-block");
        dom.setAttribute(el5, "type", "submit");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-plus-square-o");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Add Concept");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "btn btn-danger btn-block");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-cancel");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Cancel");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8 text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Add a Concept");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-tags fa-5x");
        dom.setAttribute(el5, "aria-hidden", "true");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n");
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
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [5, 1, 1]);
        var element3 = dom.childAt(element2, [18]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createMorphAt(element2, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 8, 8);
        morphs[4] = dom.createMorphAt(element2, 13, 13);
        morphs[5] = dom.createElementMorph(element3);
        morphs[6] = dom.createMorphAt(element2, 20, 20);
        morphs[7] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["toggleForm"], [], ["loc", [null, [4, 29], [4, 52]]]], ["element", "action", ["save"], ["on", "submit"], ["loc", [null, [7, 28], [7, 57]]]], ["inline", "input", [], ["id", "name", "value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [9, 28], [9, 32]]]]], [], []], "class", "form-control", "placeholder", "Concept Name"], ["loc", [null, [9, 4], [9, 82]]]], ["inline", "input", [], ["id", "max_exp", "value", ["subexpr", "@mut", [["get", "max_exp", ["loc", [null, [11, 31], [11, 38]]]]], [], []], "class", "form-control", "placeholder", "Maximum Experience Points", "type", "number"], ["loc", [null, [11, 4], [11, 115]]]], ["inline", "input", [], ["id", "author", "class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "current_user.username", ["loc", [null, [13, 67], [13, 88]]]]], [], []]], ["loc", [null, [13, 4], [13, 90]]]], ["element", "action", ["toggleForm"], [], ["loc", [null, [16, 15], [16, 38]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [17, 10], [17, 22]]]]], [], 0, null, ["loc", [null, [17, 4], [19, 11]]]], ["content", "yield", ["loc", [null, [28, 0], [28, 9]]]]],
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
              "line": 4,
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
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 3
              },
              "end": {
                "line": 14,
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
          statements: [["content", "errorMessage", ["loc", [null, [13, 9], [13, 25]]]]],
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
              "line": 4,
              "column": 1
            },
            "end": {
              "line": 16,
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
        statements: [["element", "action", ["authenticate"], ["on", "submit"], ["loc", [null, [8, 27], [8, 64]]]], ["inline", "input", [], ["id", "identification", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [9, 37], [9, 51]]]]], [], []], "class", "form-control", "placeholder", "Login"], ["loc", [null, [9, 3], [9, 94]]]], ["inline", "input", [], ["id", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [10, 31], [10, 39]]]]], [], []], "class", "form-control", "placeholder", "Password", "type", "password"], ["loc", [null, [10, 3], [10, 101]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [12, 9], [12, 21]]]]], [], 0, null, ["loc", [null, [12, 3], [14, 11]]]]],
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
            "line": 21,
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
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [2, 9], [2, 32]]]]], [], 0, 1, ["loc", [null, [2, 3], [16, 8]]]], ["content", "yield", ["loc", [null, [19, 0], [19, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("mock-kodr/templates/components/user-arena-item", ["exports"], function (exports) {
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
        "moduleName": "mock-kodr/templates/components/user-arena-item.hbs"
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
        var el4 = dom.createTextNode("\n	    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("%\n	  ");
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
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [7, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "userArena.arena.name", ["loc", [null, [20, 7], [20, 31]]]], ["content", "userArena.arena.description", ["loc", [null, [22, 33], [22, 64]]]], ["content", "userArena.progress", ["loc", [null, [27, 5], [27, 27]]]], ["content", "yield", ["loc", [null, [32, 0], [32, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mock-kodr/templates/components/user-arena-list", ["exports"], function (exports) {
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
          "moduleName": "mock-kodr/templates/components/user-arena-list.hbs"
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
        statements: [["inline", "user-arena-item", [], ["userArena", ["subexpr", "@mut", [["get", "userArena", ["loc", [null, [9, 33], [9, 42]]]]], [], []]], ["loc", [null, [9, 5], [9, 44]]]]],
        locals: ["userArena"],
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
        "moduleName": "mock-kodr/templates/components/user-arena-list.hbs"
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
        var el4 = dom.createTextNode("User Arenas");
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
define("mock-kodr/templates/concepts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 8
            },
            "end": {
              "line": 29,
              "column": 5
            }
          },
          "moduleName": "mock-kodr/templates/concepts.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n					    	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n					    		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "label label-default");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "fa fa-tags");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					    	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					    	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n					    		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("small");
          dom.setAttribute(el3, "class", "text-muted");
          var el4 = dom.createElement("em");
          var el5 = dom.createElement("code");
          var el6 = dom.createElement("a");
          var el7 = dom.createTextNode("Max Exp: ");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					    	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					    	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n					    		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					    	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					    	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n					    		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "href", "");
          dom.setAttribute(el3, "class", "btn btn-danger btn-xs");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "fa fa-trash");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					    	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n							\n							\n					    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 2, 2);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1, 0, 0, 0]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 0, 0);
          return morphs;
        },
        statements: [["content", "concept.name", ["loc", [null, [15, 72], [15, 88]]]], ["content", "concept.max_exp", ["loc", [null, [18, 59], [18, 78]]]], ["content", "concept.author.username", ["loc", [null, [21, 14], [21, 41]]]]],
        locals: ["concept"],
        templates: []
      };
    })();
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
            "line": 37,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/concepts.hbs"
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n		\n	");
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
        var el4 = dom.createElement("table");
        dom.setAttribute(el4, "class", "table table-hover");
        var el5 = dom.createTextNode("\n			    \n			    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tbody");
        var el6 = dom.createTextNode("\n			    	\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("			    ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
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
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 3, 1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "concept-create", [], ["store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [1, 23], [1, 28]]]]], [], []]], ["loc", [null, [1, 0], [1, 30]]]], ["block", "each", [["get", "model", ["loc", [null, [12, 16], [12, 21]]]]], [], 0, null, ["loc", [null, [12, 8], [29, 14]]]], ["content", "outlet", ["loc", [null, [36, 0], [36, 10]]]]],
      locals: [],
      templates: [child0]
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
      statements: [["inline", "user-arena-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 24], [1, 29]]]]], [], []]], ["loc", [null, [1, 0], [1, 31]]]], ["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]]],
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
  require("mock-kodr/app")["default"].create({"name":"mock-kodr","version":"0.0.0+5296f301"});
}

/* jshint ignore:end */
//# sourceMappingURL=mock-kodr.map