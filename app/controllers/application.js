import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import moment from 'moment'
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	current_user: storageFor('current_user'),
  
	actions: {
		session: Ember.inject.service('session'),
    invalidateSession() {
    	Ember.$.ajax({
        type: 'DELETE',
        url: '/logout'
      });
    	this.set('current_user', null);
      this.get('session').invalidate();
      
    },
  }
});
