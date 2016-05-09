QUnit.module('JSHint - components/challenge-edit.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/challenge-edit.js should pass jshint.\ncomponents/challenge-edit.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-edit.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-edit.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
