import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	actions: {
		session: Ember.inject.service('session'),
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
