define('mock-kodr/components/concept-create', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
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
        var concept = this.getProperties('name', 'max_exp');
        concept.author = this.get('current_user.user');
        $.ajaxSetup({
          headers: { 'X-K-Authorization': 'Bearer ' + that.get('current_user.token') }
        });
        _ember['default'].$.ajax({
          url: '/api/concepts',
          type: 'POST',
          data: {
            concept: concept
          }
        }).then(function (response) {
          that.store.createRecord('concept', response.concept);
        });
      }
    }
  });
});