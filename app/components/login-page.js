import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
	actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    authenticate() {

      let { identification, password } = this.getProperties('identification', 'password');
      var credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:custom', credentials).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });

    }

  }
});
