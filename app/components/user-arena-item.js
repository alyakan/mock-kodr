import Ember from 'ember';

export default Ember.Component.extend({
	arena: Ember.computed.alias("controllers.userArena.arena"),
});
