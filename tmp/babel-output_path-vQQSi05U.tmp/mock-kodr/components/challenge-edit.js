define('mock-kodr/components/challenge-edit', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    // session: Ember.inject.service('session'),
    //  current_user: storageFor('current_user'),
    //  arena: null,
    //  store: null,
    //  challenge: null,
    //  actions: {

    //  	toggleForm: function() {
    //  		Ember.$('.collapse').collapse("toggle");
    //  		Ember.$('#toggle-btn').toggle();
    //  	},
    //  	save: function() {
    //  		var that = this;
    //  		var challenge = this.getProperties('name', 'exp');
    // 		$.ajaxSetup({
    // 		    headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
    // 		});
    // 		Ember.$.ajax({
    //        url: '/api/challenges',
    //        type: 'PUT',
    //        data: {
    //          challenge: challenge
    //        }
    //      }).then(function(response) {
    //      	that.store.updateRecord('challenge', response.challenge);
    //      })

    //  	}
    //  }
  });
});