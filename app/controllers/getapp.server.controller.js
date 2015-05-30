'use strict';
var fs = require('fs');
var wait = require('wait.for');
var exec = require('child_process').exec;
var swig  = require('swig');

var util = {
	serverRootPath: '/Users/viktorot/SchoolProjects/cabbage-core/app'
};

exports.compile = function(req, resp) {
	var temp = swig.renderFile(util.serverRootPath + '/views/app-index-tmpl.html', {url: '123'});
	resp.jsonp({b: temp});
};
