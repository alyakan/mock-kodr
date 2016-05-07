import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	current_user: storageFor('current_user'),
	actions: {
		session: Ember.inject.service('session'),
    invalidateSession() {
    	this.set('current_user', null);
      this.get('session').invalidate();
    }
  }
});
