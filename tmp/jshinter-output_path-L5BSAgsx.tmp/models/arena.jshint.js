QUnit.module('JSHint - models/arena.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/arena.js should pass jshint.\nmodels/arena.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/arena.js: line 19, col 41, Missing semicolon.\nmodels/arena.js: line 49, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n5 errors');
});
