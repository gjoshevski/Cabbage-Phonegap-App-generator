'use strict';

module.exports = function(app) {
	var qrpoints = require('../../app/controllers/qrpoints.server.controller');

	// Qrpoints Routes
	app.route('/qrpoints')
		.post(qrpoints.create);
		

	app.route('/qrpoints/byappanduser/:appId/:userImei')
		.get(qrpoints.list);


	app.route('/qrpoints/:qrpointId')
		.get(qrpoints.read)
		.put(qrpoints.update)
		.delete(qrpoints.delete);

	// Finish by binding the Qrpoint middleware
	app.param('qrpointId', qrpoints.qrpointByID);
};
