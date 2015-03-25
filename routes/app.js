module.exports = function(app) {
	// Root routing

	var core = require('../modules/core/controllers/core');

	app.route('/app')
	.get(core.all)		
	.post(core.search);


	app.route('/app/search')
	.post(core.search);
};