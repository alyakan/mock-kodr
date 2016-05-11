define('mock-kodr/tests/routes/user-arenas.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/user-arenas.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/user-arenas.js should pass jshint.\nroutes/user-arenas.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 4, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});