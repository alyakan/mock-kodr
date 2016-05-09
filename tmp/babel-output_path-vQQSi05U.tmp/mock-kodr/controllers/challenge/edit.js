define('mock-kodr/controllers/challenge/edit', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    challenge: null,
    trigger: (function () {
      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        _ember['default'].$('#modal-trigger').click();
      });
    }).on('init'),
    actions: {

      toggleForm: function toggleForm() {
        _ember['default'].$('.collapse').collapse("toggle");
        _ember['default'].$('#toggle-btn').toggle();
      },
      save: function save() {
        var that = this;
        var challenge = {};
        challenge.name = _ember['default'].$('#name-edit').val();
        challenge.exp = _ember['default'].$('#exp-edit').val();
        console.log(challenge);
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/challenges/' + that.get('model').get('id'),
          type: 'PUT',
          data: {
            challenge: challenge
          }
        }).then(function (response) {
          that.store.findRecord('challenge', that.get('model').get('id')).then(function (ch) {
            ch.set('name', ch.get('name'));
            ch.set('exp', ch.get('exp'));
            _ember['default'].$('.class').click();
          });
        });
      },
      closeModal: function closeModal() {
        console.log();
        this.transitionToRoute('arena', { arena_id: this.get('model').get('arena').get('id') });
      }
    }
  });
});