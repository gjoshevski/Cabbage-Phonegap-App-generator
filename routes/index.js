/*
var express = require('express');
var router = express.Router();

/* GET home page. *

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

*/


module.exports = function(app) {
	// Root routing

	app.route('/')
	.get(function(req, res) {
		  res.render('index', { title: 'Express' });
		});
};