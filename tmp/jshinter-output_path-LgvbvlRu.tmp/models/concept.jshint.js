QUnit.module('JSHint - models/concept.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/concept.js should pass jshint.\nmodels/concept.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/concept.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/concept.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
