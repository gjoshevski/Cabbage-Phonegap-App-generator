var express = require('express');
var wait = require('wait.for');
var compiler = require('../modules/compiler');
var router = express.Router();

router.get('/', function(req, res) {
	// var success = compiler.renderFiles();
	// if(success) {
	// 	compile.compile();
	// }
	// else {
	// 	res.status(500);
	// 	res.write('Shit ain\'t working, yo!');
	// }

	wait.launchFiber(compiler.compile, res)
	// compiler.compile();
	// res.send('Shit ain\'t working, yo!');
});

module.exports = router;
