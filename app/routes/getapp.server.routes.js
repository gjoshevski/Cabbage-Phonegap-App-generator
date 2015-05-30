'use strict';

var wait = require('wait.for');

module.exports = function(app) {

	var getapp = require('../../app/controllers/getapp.server.controller');

	app.route('/get-app').get(function(req, resp) {
		wait.launchFiber(getapp.compile, req, resp);
	});

};