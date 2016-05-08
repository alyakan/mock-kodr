QUnit.module('JSHint - components/arena-create.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/arena-create.js should pass jshint.\ncomponents/arena-create.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 21, col 39, Missing semicolon.\ncomponents/arena-create.js: line 33, col 40, Missing semicolon.\ncomponents/arena-create.js: line 34, col 17, Missing semicolon.\ncomponents/arena-create.js: line 50, col 36, Missing semicolon.\ncomponents/arena-create.js: line 51, col 13, Missing semicolon.\n\n8 errors');
});
