define('mock-kodr/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 3, col 28, Missing semicolon.\ncontrollers/application.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/application.js: line 132, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/application.js: line 144, col 26, Missing semicolon.\ncontrollers/application.js: line 148, col 26, Missing semicolon.\n\n9 errors');
  });
});