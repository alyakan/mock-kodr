define('mock-kodr/models/trial', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        work: _emberData['default'].attr('mixed'),
        blueprint: _emberData['default'].attr('mixed'),
        times: _emberData['default'].attr('number'),
        exp: _emberData['default'].attr('number'),
        order: _emberData['default'].attr('number'),
        started: _emberData['default'].attr('boolean'),
        startTime: _emberData['default'].attr('date'),
        endTime: _emberData['default'].attr('date'),
        complete: _emberData['default'].attr('boolean'),
        completed: _emberData['default'].attr('number'),
        report: _emberData['default'].attr(),
        challenge: _emberData['default'].belongsTo('challenge', { async: true }),
        user: _emberData['default'].belongsTo('user'),
        arena: _emberData['default'].belongsTo('arena'),
        userArena: _emberData['default'].belongsTo('userArena'),

        canSubmit: (function () {
            return !this.get('complete') || this.get('hasDirtyAttributes') || this.get('contentChanged');
        }).property('complete', 'hasDirtyAttributes', 'contentChanged'),

        contentChanged: false,
        save: function save() {
            this.set('contentChanged', false);
            return this._super.apply(this, arguments);
        },
        set: function set(keyName, value) {
            this._super(keyName, value);
            if (keyName.indexOf('blueprint.') > -1 || keyName.indexOf('work.') > -1) {
                // a property of `blueprint` has changed => notify observers of `blueprint`
                // this.notifyPropertyChange(keyName);
                this.set('contentChanged', true);
            }
        }
    });
});