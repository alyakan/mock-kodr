define('mock-kodr/tests/controllers/challenge/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/challenge/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/challenge/edit.js should pass jshint.\ncontrollers/challenge/edit.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/challenge/edit.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/challenge/edit.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/challenge/edit.js: line 26, col 33, Missing semicolon.\ncontrollers/challenge/edit.js: line 45, col 24, Missing semicolon.\n\n5 errors');
  });
});