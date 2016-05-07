define('mock-kodr/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 2, col 8, \'config\' is defined but never used.\n\n1 error');
  });
});