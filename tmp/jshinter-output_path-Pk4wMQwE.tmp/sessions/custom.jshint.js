QUnit.module('JSHint - sessions/custom.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'sessions/custom.js should pass jshint.\nsessions/custom.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nsessions/custom.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
});
