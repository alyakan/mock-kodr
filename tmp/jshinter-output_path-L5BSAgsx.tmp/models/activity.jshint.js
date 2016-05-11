QUnit.module('JSHint - models/activity.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/activity.js should pass jshint.\nmodels/activity.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/activity.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/activity.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/activity.js: line 15, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
});
