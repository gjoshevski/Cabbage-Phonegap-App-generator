var express = require('express');
var compiler = require('../modules/compiler');
var router = express.Router();

router.get('/', function(req, res) {
  compiler.compile();
  // console.log(util.serverRootPath());
});

module.exports = router;
