'use strict';

module.exports = function(app) {

	var restoranmenus = require('../../app/controllers/restoranmenus.server.controller');

	// Restoranmenus Routes
	app.route('/restoranmenus')
	//	.get(restoranmenus.list)
		.post(restoranmenus.create);
		
	// Restoranmenus Routes
	app.route('/restoranmenus/byApp/:appId')
		.get(restoranmenus.list);
		


	app.route('/restoranmenus/:restoranmenuId')
		.get(restoranmenus.read)
		.put(restoranmenus.update)
		.delete(restoranmenus.delete);

	// Finish by binding the Restoranmenu middleware
	app.param('restoranmenuId', restoranmenus.restoranmenuByID);
	
};
