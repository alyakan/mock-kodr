QUnit.module('JSHint - models/mixed.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/mixed.js should pass jshint.\nmodels/mixed.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/mixed.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/mixed.js: line 12, col 8, Missing property name.\nmodels/mixed.js: line 21, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nmodels/mixed.js: line 25, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
});
