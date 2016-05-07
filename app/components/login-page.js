import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
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
