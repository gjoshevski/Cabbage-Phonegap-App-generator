/*
var express = require('express');
var router = express.Router();

/* GET users listing. *
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;


*/


module.exports = function(app) {
	// Root routing
	var user = require('../modules/users/controllers/user');

	app.route('/user')
	.get(function(req, res) {
		  res.render('user', { title: 'Users' });
		}
		).post(user.login);
};