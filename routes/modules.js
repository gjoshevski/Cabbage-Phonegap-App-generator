
module.exports = function(app) {
	// Root routing

	

	app.route('/modules')
	.get(function(req, res) {
		  res.render('modules', { title: 'Express' });
		});
};



	app.route('/modules')
	.get(function(req, res) {
		  res.render('modules', { title: 'Express' });
		});
};