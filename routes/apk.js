var wait = require('wait.for');
var compiler = require('../modules/compiler');
var dbModels = require('../models/models');
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
		}
	});
	app.route('/apk/companies').get(function(req, resp) {
		// console.log(dbModels.Company());
		// resp.send("ok");
		dbModels.Company.fetchAll().then(function(contacts) {
			 resp.send('{"companies:" ' + JSON.stringify(contacts) + '}');
		});
	});
};