'use strict';

module.exports = function(app) {

	var restoranmenus = require('../../app/controllers/restoranmenus.server.controller');

	// Restoranmenus Routes
	app.route('/restoranmenus')
		.options(restoranmenus.options)
		.post(restoranmenus.create);
		
	// Restoranmenus Routes
	app.route('/restoranmenus/byApp/:appId')
		.options(restoranmenus.options)
		.get(restoranmenus.list);
		


	app.route('/restoranmenus/:restoranmenuId')
		.options(restoranmenus.options)
		.get(restoranmenus.read)
		.put(restoranmenus.update)
		.delete(restoranmenus.delete);

	// Finish by binding the Restoranmenu middleware
	app.param('restoranmenuId', restoranmenus.restoranmenuByID);
	
};
