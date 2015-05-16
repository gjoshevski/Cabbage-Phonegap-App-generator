'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bcards = require('../../app/controllers/bcards.server.controller');

	// Bcards Routes
	app.route('/bcards')
		.get(bcards.list)
		.post(users.requiresLogin, bcards.create);

	app.route('/bcards/:bcardId')
		.get(bcards.read)
		.put(users.requiresLogin, bcards.hasAuthorization, bcards.update)
		.delete(users.requiresLogin, bcards.hasAuthorization, bcards.delete);

	// Finish by binding the Bcard middleware
	app.param('bcardId', bcards.bcardByID);
};
