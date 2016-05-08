import Ember from 'ember';
import OAuth2 from 'mock-kodr/authenticators/oauth2';
import { storageFor } from 'ember-local-storage';

export default OAuth2.extend({
  session: Ember.inject.service('session'),
  current_user: storageFor('current_user'),
  authenticate(credentials) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // make the request to authenticate the user at endpoint /v3/token
      
      Ember.$.ajax({
        url: '/token',
        type: 'POST',
        data: {
            grant_type: 'password',
            identification: credentials.identification,
            password: credentials.password
        }
      }).then(function(response) {
          Ember.run(function() {
              // resolve (including the user id) as the AJAX request was successful; all properties this promise resolves
              // with will be available through the session
              console.log(response)
              that.set('current_user.id', response.user_id);
              that.set('current_user.token', response.token);
              that.set('current_user.email', response.email);
              that.set('current_user.username', response.username);
              $.ajaxSetup({
                headers: { 'X-K-Authorization': 'Bearer ' + response.token }
              });
              resolve({
                  access_token: response.access_token,
                  user_id: response.user_id
              });
          });
      }, function(xhr) {
          Ember.run(function() {
              reject(xhr.responseText);
          });
      });
    });
  }
});
