QUnit.module('JSHint - storages/current-user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'storages/current-user.js should pass jshint.\nstorages/current-user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nstorages/current-user.js: line 3, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nstorages/current-user.js: line 12, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
