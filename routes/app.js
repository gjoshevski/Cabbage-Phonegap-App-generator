module.exports = function(app) {
	// Root routing

	app.route('/app')
	.get(function(req, res) {
		  res.render('app', { title: 'Express' });
		});
};