var CabbageNews = {
	pullInterval: 5*1000,
	timerId: undefined,
	init: function() {
		console.log('cabbage-news | init');

		var self = this;
		this.timerId = window.setInterval(function() { self.pullNews() }, this.pullInterval);
	},
	stop: function() {
		if(this.timerId !== undefined) {
			window.clearInterval(this.timerId);
			this.timerId = undefined;
		}
	},
	pullNews: function()  {
		this.showNotification("Test notif");
	},
	showNotification: function(text) {
		console.log(text);
		var now = new Date().getTime();
		cordova.plugins.notification.local.schedule({
			id: 101,
			text: text,
			at: now
		});	
	}
}