define('mock-kodr/tests/components/concept-create.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/concept-create.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/concept-create.js should pass jshint.\ncomponents/concept-create.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/concept-create.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/concept-create.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/concept-create.js: line 16, col 57, Missing semicolon.\n\n4 errors');
  });
});