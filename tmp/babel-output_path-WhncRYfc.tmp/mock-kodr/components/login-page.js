define('mock-kodr/components/login-page', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      },
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        this.get('session').authenticate('authenticator:oauth2', identification, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error || reason);
        });
      }

    }
  });
});