QUnit.module('JSHint - controllers/arenas.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/arenas.js should pass jshint.\ncontrollers/arenas.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/arenas.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
