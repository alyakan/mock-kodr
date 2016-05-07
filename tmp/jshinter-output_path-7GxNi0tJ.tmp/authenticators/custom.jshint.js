QUnit.module('JSHint - authenticators/custom.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'authenticators/custom.js should pass jshint.\nauthenticators/custom.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nauthenticators/custom.js: line 6, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nauthenticators/custom.js: line 23, col 36, Missing semicolon.\n\n5 errors');
});
