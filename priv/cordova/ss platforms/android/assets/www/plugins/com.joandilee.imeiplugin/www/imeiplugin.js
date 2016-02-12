cordova.define("com.joandilee.imeiplugin.imeiplugin", function(require, exports, module) { function IMEIPlugin() {
	this.getImei = function(returnCallback) {
		cordova.exec(returnCallback, function(){}, "imeiplugin", "getImei", []);
	}
}

if(!window.plugins) {
	window.plugins = {}
}

window.plugins.imeiplugin = new IMEIPlugin();
});
