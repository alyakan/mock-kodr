define('mock-kodr/tests/models/concept.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/concept.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/concept.js should pass jshint.\nmodels/concept.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/concept.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});