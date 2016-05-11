QUnit.module('JSHint - authorizers/oauth2.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'authorizers/oauth2.js should pass jshint.\nauthorizers/oauth2.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthorizers/oauth2.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
