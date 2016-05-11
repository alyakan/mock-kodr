QUnit.module('JSHint - components/challenge-create.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/challenge-create.js should pass jshint.\ncomponents/challenge-create.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-create.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-create.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-create.js: line 17, col 49, Missing semicolon.\ncomponents/challenge-create.js: line 22, col 14, Missing semicolon.\ncomponents/challenge-create.js: line 34, col 9, Missing semicolon.\n\n6 errors');
});
