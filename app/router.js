import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('arenas', {
    resetNameSpace: true,
    path: '/arenas'
  }, function() {
    this.route('create');
  });

  this.route('userArenas', {
    resetNameSpace: true,
  	path: '/user-arenas'
  });

  this.route('arena', {
    resetNameSpace: true,
    path: '/arenas/:arena_id'
  }, function() {
    this.route('edit');
    this.route('challenge', {
      resetNameSpace: true,
      path: 'challenge/:challenge_id'
    }, function() {
      this.route('edit');
      this.route('try');
      this.route('copy');
    });
    this.route('challenges', {
      resetNameSpace: true,
      path: 'challenge'
    }, function() {
      this.route('create');
    });      
  });

  this.route('concepts', {resetNameSpace: true});
  this.route('charts');

  this.route('userArena', {
    path: '/arena/:user_arena_id' //used to load a user arena
  }, function() {
    this.route('trial', {
      path: '/try/:trial_id' //used to load trial
    });
    this.route('randomChallenge', {
      resetNameSpace: true,
      path: '/random'
    });
  });
});

export default Router;
