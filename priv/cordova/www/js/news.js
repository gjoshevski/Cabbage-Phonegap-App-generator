var CabbageNews = {
	pullInterval: 5*1000,
	timerId: undefined,

	init: function() {
		console.log('cabbage-news | init');
		this.start();
	},
	start: function() {
		var self = this;
		this.timerId = window.setTimeout(function() { self.pullNews() }, this.pullInterval);
	},
	stop: function() {
		if(this.timerId !== undefined) {
			window.setTimeout(this.timerId);
			this.timerId = undefined;
		}
	},
	pullNews: function()  {
		this.stop();
		this.getNews();
	},
	showNotification: function(text) {
		var now = new Date().getTime();
		cordova.plugins.notification.local.schedule({
			id: 101,
			text: text,
			at: now
		});	
	},
	getNews: function() {
		var self = this;
		$.get({
			type: 'GET',
			url: CabbageConf.endpoint + '/news'
		})
		.done(function(response) {
			self.showNotification('Test notif');
			self.start();
		})
		.fail(function() {
			console.log('cabbage-news | news load error')
		});
	}
}