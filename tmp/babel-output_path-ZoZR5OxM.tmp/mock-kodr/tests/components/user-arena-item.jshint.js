define('mock-kodr/tests/components/user-arena-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/user-arena-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-arena-item.js should pass jshint.\ncomponents/user-arena-item.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/user-arena-item.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});