define('mock-kodr/tests/models/user-arena.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user-arena.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user-arena.js should pass jshint.\nmodels/user-arena.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/user-arena.js: line 15, col 87, Missing semicolon.\nmodels/user-arena.js: line 16, col 32, Missing semicolon.\n\n5 errors');
  });
});