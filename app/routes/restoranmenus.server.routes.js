'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var restoranmenus = require('../../app/controllers/restoranmenus.server.controller');

	// Restoranmenus Routes
	app.route('/restoranmenus')
		.get(restoranmenus.list)
		.post(users.requiresLogin, restoranmenus.create);

	app.route('/restoranmenus/:restoranmenuId')
		.get(restoranmenus.read)
		.put(users.requiresLogin, restoranmenus.hasAuthorization, restoranmenus.update)
		.delete(users.requiresLogin, restoranmenus.hasAuthorization, restoranmenus.delete);

	// Finish by binding the Restoranmenu middleware
	app.param('restoranmenuId', restoranmenus.restoranmenuByID);
};
