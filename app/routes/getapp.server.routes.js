'use strict';

module.exports = function(app) {

	var getapp = require('../../app/controllers/getapp.server.controller');

	app.route('/get-app')
		.post(function(req, resp) {
			getapp.compile(req, resp);
		});

	app.route('/get-app/:appName')
		.get(getapp.download);

};