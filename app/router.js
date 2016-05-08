import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.resource('arenas', {
    path: '/arenas'
  }, function() {
    this.route('create');
  });
  this.resource('userArenas', {
  	path: '/user-arenas'
  });
});

export default Router;
