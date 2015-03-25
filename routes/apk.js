var express = require('express');
var wait = require('wait.for');
var compiler = require('../modules/compiler');
var router = express.Router();

router.get('/', function(req, resp) {
	// wait.launchFiber(compiler.compile, resp);
});

// router.get('/get', function(req, resp) {
// 	wait.launchFiber(compiler.compile, { appName: "ZeName", modules: ["yo-list"] }, resp);
// });

router.post('/get', function(req, resp) {
	if(req.body.appName === undefined || req.body.modules === undefined || req.body.modules.length === 0) {
		resp.status(400);
		resp.send('Bad request.');
	}
	else {
		wait.launchFiber(compiler.compile, req.body, resp);
	}
});

module.exports = router;
