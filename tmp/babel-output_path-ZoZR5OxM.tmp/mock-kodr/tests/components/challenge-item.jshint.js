define('mock-kodr/tests/components/challenge-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/challenge-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/challenge-item.js should pass jshint.\ncomponents/challenge-item.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-item.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/challenge-item.js: line 11, col 51, Missing semicolon.\n\n3 errors');
  });
});