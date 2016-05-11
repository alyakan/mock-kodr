QUnit.module('JSHint - routes/arena.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/arena.js should pass jshint.\nroutes/arena.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/arena.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/arena.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/arena.js: line 4, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/arena.js: line 8, col 11, Missing semicolon.\n\n5 errors');
});
