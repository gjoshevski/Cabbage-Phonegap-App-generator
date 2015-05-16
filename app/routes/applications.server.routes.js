'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var applications = require('../../app/controllers/applications.server.controller');

	// Applications Routes
	app.route('/applications')
		.get(applications.list)
		.post(users.requiresLogin, applications.create);

	app.route('/applications/:applicationId')
		.get(applications.read)
		.put(users.requiresLogin, applications.hasAuthorization, applications.update)
		.delete(users.requiresLogin, applications.hasAuthorization, applications.delete);

	// Finish by binding the Application middleware
	app.param('applicationId', applications.applicationByID);
};
