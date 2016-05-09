define('mock-kodr/router', ['exports', 'ember', 'mock-kodr/config/environment'], function (exports, _ember, _mockKodrConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _mockKodrConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.resource('arenas', {
      path: '/arenas'
    }, function () {
      this.route('create');
    });
    this.resource('userArenas', {
      path: '/user-arenas'
    });
    this.resource('arena', {
      path: '/arenas/:arena_id'
    }, function () {
      this.route('edit');
      this.resource('challenge', {
        path: 'challenge/:challenge_id'
      }, function () {
        this.route('edit');
        this.route('try');
        this.route('copy');
      });
      this.resource('challenges', {
        path: 'challenge'
      }, function () {
        this.route('create');
      });
    });
  });

  exports['default'] = Router;
});