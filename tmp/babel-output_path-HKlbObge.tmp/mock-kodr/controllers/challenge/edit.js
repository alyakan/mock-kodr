define('mock-kodr/controllers/challenge/edit', ['exports', 'ember', 'ember-local-storage', 'lodash/lodash'], function (exports, _ember, _emberLocalStorage, _lodashLodash) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    arena: null,
    store: null,
    challenge: null,
    concepts: [],
    chosenConcepts: [],
    trigger: (function () {
      var arr = [];
      var that = this;
      this.store.findAll('concept').then(function (cons) {
        cons.map(function (c) {
          arr.push({
            name: c.get('name'),
            id: c.get('id')
          });
        });
        that.set('concepts', arr);
      });

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
        var cons = _lodashLodash['default'].map(this.get('chosenConcepts'), function (con) {
          return con.id;
        });
        challenge.concepts = cons;
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
            ch.set('concepts', ch.get('concepts'));
            _ember['default'].$('.close').click();
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