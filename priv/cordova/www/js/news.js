var CabbageNews = {
	pullInterval: 20*1000,
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
			window.clearTimeout(this.timerId);
			this.timerId = undefined;
		}
	},
	pullNews: function()  {
		this.stop();
		this.getNews();
	},
	showNotification: function(text, url) {
		var now = new Date().getTime();
		cordova.plugins.notification.local.schedule({
			id: 101,
			text: text,
			at: now,
			data: {url: url}
		});

		var self = this;
		cordova.plugins.notification.local.on('click', function(notification){
			var data = JSON.parse(notification.data);
			var url = data.url;
			self.openInBrowser(url);
		});
	},
	openInBrowser: function(url) {
		window.open(url, '_blank', 'location=yes');
	},
	getNews: function() {
		var self = this;
		self.showNotification('Test notif', 'http://reddit.com');
		self.start();

		// $.get({
		// 	type: 'GET',
		// 	url: CabbageConf.endpoint + '/news'
		// })
		// .done(function(response) {
		// 	self.showNotification('Test notif');
		// 	self.start();
		// })
		// .fail(function() {
		// 	console.log('cabbage-news | news load error')
		// });
	}
}