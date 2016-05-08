import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('arenas');
  this.resource('userArenas', {
  	path: '/user-arenas'
  });
});

export default Router;
