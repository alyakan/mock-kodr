define('mock-kodr/components/challenge-create', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    actions: {
      toggleForm: function toggleForm() {
        _ember['default'].$('.collapse').collapse("toggle");
        _ember['default'].$('#toggle-btn').toggle();
      },
      save: function save() {
        var that = this;
        var challenge = this.getProperties('name', 'exp');
        var pre_id = _ember['default'].$('#prerequisit').val();
        challenge.arena = this.get('arena').id;
        challenge.mock = true;
        challenge.isPublished = true;
        challenge.flags = {
          beta: false
        };
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/challenges',
          type: 'POST',
          data: {
            challenge: challenge
          }
        }).then(function (response) {
          that.store.createRecord('challenge', challenge);
        });
      }
    }
  });
});