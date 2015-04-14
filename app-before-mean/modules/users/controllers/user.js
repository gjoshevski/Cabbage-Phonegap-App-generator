
var _ = require("lodash");


exports.login = function(req, res) {	
		  res.render('hiuser', { name: req.body.name, pass:req.body.pass });
};


