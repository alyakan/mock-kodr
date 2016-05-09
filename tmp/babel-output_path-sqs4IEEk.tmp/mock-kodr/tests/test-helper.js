define('mock-kodr/tests/test-helper', ['exports', 'mock-kodr/tests/helpers/resolver', 'ember-qunit'], function (exports, _mockKodrTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mockKodrTestsHelpersResolver['default']);
});