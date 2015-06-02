'use strict';

module.exports = function(app) {

	var getapp = require('../../app/controllers/getapp.server.controller');

	app.route('/get-app').get(function(req, resp) {
		getapp.compile(req, resp);
	});

};