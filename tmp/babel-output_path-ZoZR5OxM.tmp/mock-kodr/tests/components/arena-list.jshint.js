define('mock-kodr/tests/components/arena-list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/arena-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/arena-list.js should pass jshint.\ncomponents/arena-list.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-list.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});