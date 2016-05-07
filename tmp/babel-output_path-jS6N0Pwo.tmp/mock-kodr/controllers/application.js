define('mock-kodr/controllers/application', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    actions: {
      session: _ember['default'].inject.service('session'),
      invalidateSession: function invalidateSession() {
        this.set('current_user', null);
        this.get('session').invalidate();
      }
    }
  });
});