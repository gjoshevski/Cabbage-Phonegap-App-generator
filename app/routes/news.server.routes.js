'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var news = require('../../app/controllers/news.server.controller');

	// News Routes
	app.route('/news')
		.post(news.create);
		
	app.route('/news/byappid/:appId')
		.get(news.list);

	app.route('/news/:newsId')
		.get(news.read)
		.put(news.update)
		.delete(news.delete);

	// Finish by binding the News middleware
	app.param('newsId', news.newsByID);
};
