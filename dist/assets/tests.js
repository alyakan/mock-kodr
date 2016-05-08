define('mock-kodr/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('mock-kodr/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 6, col 1, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 13, col 3, \'object short notation\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors');
  });
});
define('mock-kodr/tests/authenticators/custom.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/custom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/custom.js should pass jshint.\nauthenticators/custom.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 8, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nauthenticators/custom.js: line 25, col 36, Missing semicolon.\n\n6 errors');
  });
});
define('mock-kodr/tests/authenticators/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/oauth2.js should pass jshint.\nauthenticators/oauth2.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/oauth2.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/authorizers/oauth2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authorizers/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authorizers/oauth2.js should pass jshint.\nauthorizers/oauth2.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthorizers/oauth2.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/components/arena-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/arena-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/arena-item.js should pass jshint.\ncomponents/arena-item.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-item.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/components/arena-list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/arena-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/arena-list.js should pass jshint.\ncomponents/arena-list.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-list.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/components/login-page.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/login-page.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/login-page.js should pass jshint.\ncomponents/login-page.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 11, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 13, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 13, col 7, \'destructuring binding\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 15, col 90, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n8 errors');
  });
});
define('mock-kodr/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 9, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});
define('mock-kodr/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('mock-kodr/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('mock-kodr/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('mock-kodr/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'mock-kodr/tests/helpers/start-app', 'mock-kodr/tests/helpers/destroy-app'], function (exports, _qunit, _mockKodrTestsHelpersStartApp, _mockKodrTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mockKodrTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _mockKodrTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('mock-kodr/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('mock-kodr/tests/helpers/resolver', ['exports', 'mock-kodr/resolver', 'mock-kodr/config/environment'], function (exports, _mockKodrResolver, _mockKodrConfigEnvironment) {

  var resolver = _mockKodrResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mockKodrConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockKodrConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('mock-kodr/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('mock-kodr/tests/helpers/start-app', ['exports', 'ember', 'mock-kodr/app', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrApp, _mockKodrConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _mockKodrConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _mockKodrApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('mock-kodr/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('mock-kodr/tests/integration/components/arena-item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('arena-item', 'Integration | Component | arena item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'arena-item', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'arena-item', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mock-kodr/tests/integration/components/arena-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/arena-item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/arena-item-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/integration/components/arena-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('arena-list', 'Integration | Component | arena list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'arena-list', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'arena-list', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mock-kodr/tests/integration/components/arena-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/arena-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/arena-list-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/integration/components/login-page-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('login-page', 'Integration | Component | login page', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'login-page', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'login-page', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mock-kodr/tests/integration/components/login-page-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/login-page-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/login-page-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/models/arena.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/arena.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/arena.js should pass jshint.\nmodels/arena.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('mock-kodr/tests/models/user-arena.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user-arena.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user-arena.js should pass jshint.\nmodels/user-arena.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 15, col 87, Missing semicolon.\nmodels/user-arena.js: line 16, col 32, Missing semicolon.\n\n5 errors');
  });
});
define('mock-kodr/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('mock-kodr/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'resolver.js should pass jshint.\nresolver.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nresolver.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 4, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nrouter.js: line 14, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('mock-kodr/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('mock-kodr/tests/routes/arenas.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/arenas.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/arenas.js should pass jshint.\nroutes/arenas.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/arenas.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/arenas.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/arenas.js: line 4, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});
define('mock-kodr/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass jshint.\nroutes/login.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/login.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/routes/user-arenas.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/user-arenas.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/user-arenas.js should pass jshint.\nroutes/user-arenas.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 4, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});
define('mock-kodr/tests/serializers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/application.js should pass jshint.\nserializers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nserializers/application.js: line 7, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});
define('mock-kodr/tests/sessions/custom.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - sessions/custom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'sessions/custom.js should pass jshint.\nsessions/custom.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});
define('mock-kodr/tests/storages/current-user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - storages/current-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'storages/current-user.js should pass jshint.\nstorages/current-user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nstorages/current-user.js: line 3, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nstorages/current-user.js: line 12, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});
define('mock-kodr/tests/test-helper', ['exports', 'mock-kodr/tests/helpers/resolver', 'ember-qunit'], function (exports, _mockKodrTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mockKodrTestsHelpersResolver['default']);
});
define('mock-kodr/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('mock-kodr/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('mock-kodr/tests/unit/controllers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/models/arena-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('arena', 'Unit | Model | arena', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('mock-kodr/tests/unit/models/arena-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/arena-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/arena-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/models/user-arena-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user-arena', 'Unit | Model | user arena', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('mock-kodr/tests/unit/models/user-arena-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/user-arena-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-arena-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('mock-kodr/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mock-kodr/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/routes/arenas-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:arenas', 'Unit | Route | arenas', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mock-kodr/tests/unit/routes/arenas-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/arenas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/arenas-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mock-kodr/tests/unit/routes/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/routes/user-arenas-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:user-arenas', 'Unit | Route | user arenas', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mock-kodr/tests/unit/routes/user-arenas-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/user-arenas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/user-arenas-test.js should pass jshint.');
  });
});
define('mock-kodr/tests/unit/serializers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('mock-kodr/tests/unit/serializers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('mock-kodr/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map