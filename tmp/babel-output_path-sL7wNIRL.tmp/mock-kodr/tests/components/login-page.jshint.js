define('mock-kodr/tests/components/login-page.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/login-page.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/login-page.js should pass jshint.\ncomponents/login-page.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 11, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 13, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 13, col 7, \'destructuring binding\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 15, col 90, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n8 errors');
  });
});