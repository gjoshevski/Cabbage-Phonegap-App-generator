'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var appmoduleengines = require('../../app/controllers/appmoduleengines.server.controller');

	// Appmoduleengines Routes
	app.route('/appmoduleengines')
		.get(appmoduleengines.list)
		.post(users.requiresLogin, appmoduleengines.create);

	app.route('/appmoduleengines/:appmoduleengineId')
		.get(appmoduleengines.read)
		.put(users.requiresLogin, appmoduleengines.hasAuthorization, appmoduleengines.update)
		.delete(users.requiresLogin, appmoduleengines.hasAuthorization, appmoduleengines.delete);

	// Finish by binding the Appmoduleengine middleware
	app.param('appmoduleengineId', appmoduleengines.appmoduleengineByID);
};
