'use strict';

var wait = require('wait.for');
var compiler = require('../modules/compiler');

module.exports = function(app) {
	// Root routing

	app.route('/get')
	.get(function(req, resp) {
		console.log(req.query);
	  	if(req.query.appName === undefined || req.query.modules === undefined || req.query.modules.length === 0) {
			resp.status(400);
			resp.send('Bad request.');
		}
		else {
			wait.launchFiber(compiler.compile, req.query, resp);
			//resp.send('Ok.');
		}
	});
};