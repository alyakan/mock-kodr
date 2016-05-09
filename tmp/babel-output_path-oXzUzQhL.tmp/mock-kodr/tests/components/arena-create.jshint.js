define('mock-kodr/tests/components/arena-create.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/arena-create.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/arena-create.js should pass jshint.\ncomponents/arena-create.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/arena-create.js: line 32, col 17, Missing semicolon.\ncomponents/arena-create.js: line 48, col 13, Missing semicolon.\n\n5 errors');
  });
});