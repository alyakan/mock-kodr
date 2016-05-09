define("mock-kodr/components/user-arena-item", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({
		arena: _ember["default"].computed.alias("controllers.userArena.arena")
	});
});