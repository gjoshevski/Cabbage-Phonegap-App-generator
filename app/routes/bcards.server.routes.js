'use strict';

module.exports = function(app) {
	var bcards = require('../../app/controllers/bcards.server.controller');

	// Bcards Routes
	app.route('/bcards')
		.post(bcards.create);
		
		// Bcards Routes
	app.route('/bcards/:appId')
		.get(bcards.list);

	app.route('/bcards/:bcardId')
		.get(bcards.read)
		.put(bcards.update)
		.delete(bcards.delete);

	// Finish by binding the Bcard middleware
	app.param('bcardId', bcards.bcardByID);
};
