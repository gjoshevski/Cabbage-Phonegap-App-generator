var wait = require('wait.for');
var compiler = require('../modules/compiler');
var dbModels = require('../db/models/models');
var knex = require('knex')(require('../knexfile').development);
var bookshelf = require('bookshelf')(knex);

module.exports = function(app) {
	app.route('/apk').get(function(req, resp) {
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

	app.route('/config').get(function(req, resp) {
		wait.launchFiber(compiler.renderConfig);
		resp.send("Kokal");
	});
};