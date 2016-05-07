define('mock-kodr/authenticators/custom', ['exports', 'ember', 'mock-kodr/authenticators/oauth2', 'ember-local-storage'], function (exports, _ember, _mockKodrAuthenticatorsOauth2, _emberLocalStorage) {
    exports['default'] = _mockKodrAuthenticatorsOauth2['default'].extend({
        session: _ember['default'].inject.service('session'),
        current_user: (0, _emberLocalStorage.storageFor)('current_user'),
        authenticate: function authenticate(credentials) {
            var that = this;
            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                // make the request to authenticate the user at endpoint /v3/token

                _ember['default'].$.ajax({
                    url: '/token',
                    type: 'POST',
                    data: {
                        grant_type: 'password',
                        identification: credentials.identification,
                        password: credentials.password
                    }
                }).then(function (response) {
                    _ember['default'].run(function () {
                        // resolve (including the user id) as the AJAX request was successful; all properties this promise resolves
                        // with will be available through the session
                        console.log(response);
                        that.set('current_user.id', response.user_id);
                        that.set('current_user.token', response.token);
                        that.set('current_user.email', response.email);
                        that.set('current_user.username', response.username);
                        resolve({
                            access_token: response.access_token,
                            user_id: response.user_id
                        });
                    });
                }, function (xhr) {
                    _ember['default'].run(function () {
                        reject(xhr.responseText);
                    });
                });
            });
        }
    });
});