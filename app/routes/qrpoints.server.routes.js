'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var qrpoints = require('../../app/controllers/qrpoints.server.controller');

	// Qrpoints Routes
	app.route('/qrpoints')
		.get(qrpoints.list)
		.post(users.requiresLogin, qrpoints.create);

	app.route('/qrpoints/:qrpointId')
		.get(qrpoints.read)
		.put(users.requiresLogin, qrpoints.hasAuthorization, qrpoints.update)
		.delete(users.requiresLogin, qrpoints.hasAuthorization, qrpoints.delete);

	// Finish by binding the Qrpoint middleware
	app.param('qrpointId', qrpoints.qrpointByID);
};
