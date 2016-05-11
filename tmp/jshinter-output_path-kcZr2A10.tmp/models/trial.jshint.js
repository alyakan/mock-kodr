QUnit.module('JSHint - models/trial.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/trial.js should pass jshint.\nmodels/trial.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/trial.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/trial.js: line 26, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
});
