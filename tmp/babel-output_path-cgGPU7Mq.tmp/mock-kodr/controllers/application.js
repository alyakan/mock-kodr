define('mock-kodr/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    actions: {
      session: _ember['default'].inject.service('session'),
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});