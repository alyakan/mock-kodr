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

  this.resource('arena', {
    path: '/arenas/:arena_id'
  }, function() {
    this.route('edit');
    this.resource('challenge', {
      path: 'challenge/:challenge_id'
    }, function() {
      this.route('edit');
      this.route('try');
      this.route('copy');
    });
    this.resource('challenges', {
      path: 'challenge'
    }, function() {
      this.route('create');
    });      
  });

  this.resource('concepts');
  this.route('charts');

  this.route('userArena', {
    path: '/arena/:user_arena_id' //used to load a user arena
  }, function() {
    this.route('trial', {
      path: '/try/:trial_id' //used to load trial
    });
    this.resource('randomChallenge', {
      path: '/random'
    });
  });
});

export default Router;
