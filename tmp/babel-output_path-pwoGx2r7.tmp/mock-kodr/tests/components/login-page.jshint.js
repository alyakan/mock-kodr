define('mock-kodr/tests/components/login-page.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/login-page.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/login-page.js should pass jshint.');
  });
});