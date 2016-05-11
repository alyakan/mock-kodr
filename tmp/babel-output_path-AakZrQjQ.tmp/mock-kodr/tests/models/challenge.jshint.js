define('mock-kodr/tests/models/challenge.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/challenge.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/challenge.js should pass jshint.\nmodels/challenge.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/challenge.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/challenge.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});