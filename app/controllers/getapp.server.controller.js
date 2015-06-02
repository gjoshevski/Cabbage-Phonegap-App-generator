'use strict';
var fs = require('fs');
var wait = require('wait.for');
var exec = require('child_process').exec;
var swig  = require('swig');
var async  = require('async');

var util = {
	serverRootPath: '/Users/viktorot/SchoolProjects/cabbage-core',
	apk: '/priv/cordova/platforms/android/ant-build/MainActivity-debug.apk',
	outputDir: '/priv/cordova/www'
	// outputDir: '/templates'

};

/*
	1. create render data
	2. render index
	3. render config (need appId)
	4. copy data & compile
*/
exports.compile = function(req, resp) {
	var data = {
		appId: '123',
		admin: true,
		modules: ['bcard', 'menu', 'points']
	};

	async.waterfall([
		function(callback) {
			var temp = swig.renderFile(util.serverRootPath + '/templates/index.tmpl.html', data);		
			console.log('getapp | index template rendered');
			callback(null, temp);					// render index template
		},
		function(template, callback) {
			var root = util.serverRootPath;
			var outDir = util.outputDir;

			fs.writeFile(root + outDir + '/index.html', template, function(error) {
				if(error) {
					console.error('getapp | index template not saved');
					callback(null, false);
				}
				else {
					console.log('getapp | index template saved');
					callback(null, true);
				}
			});			
		},
		function(saved, callback) {
			if(saved) {
				var temp = swig.renderFile(util.serverRootPath + '/templates/config.tmpl.html', data);
				console.log('getapp | config template rendered');
				callback(null, temp);
			}
			else {
				callback(null, undefined);
			}				
		},
		function(template, callback) {
			var root = util.serverRootPath;
			var outDir = util.outputDir;

			if(template !== undefined) {
				fs.writeFile(root + outDir + '/config.js', template, function(error) {
					if(error) {
						console.error('getapp | config template not saved');
						callback(null, false);
					}
					else {
						console.log('getapp | config template saved');
						callback(null, true);
					}
				});
			}
			else {
				callback(null, false);
			} 			
		},
		function(saved, callback) {
			if(saved === true) {
				var moduleList = data.modules.map(function(elem) { return elem; }).join(' ');
				console.log('getapp | module list => ' + moduleList);
				exec('sh ' + util.serverRootPath + '/script/compile.sh '+ moduleList +' | tail', function(error, stdout, stderr){
					if(stdout.indexOf('BUILD SUCCESSFUL') >= 0) {
						console.log('getapp | build success');
						callback(null, true);
					}
					else {
						console.error('getapp | build error');
						callback(null, false);
					}
				});
			}
			else {
				callback(null, false);
			}
		}
	],
	function(error, done) {
		if(done) {
			resp.jsonp({compile: 'done'});
			// var root = util.serverRootPath;
			// var apkPath = util.apk;
			// var appName = 'test';

			// fs.readFile(root+apkPath, function(err, data) {
			// 	if(!err) {
			// 		resp.set('Content-Length', data.length);
			// 		resp.set('Content-Type', 'application/vnd.android.package-archive');
			// 		resp.set('Content-Disposition', 'attachment; filename='+ appName +'.apk');
			// 		resp.status(200);
			// 		resp.end(data);
			// 	} else {
			// 		console.log("getapp | get apk error");
			// 		resp.jsonp({compile: 'failed'});
			// 	}
			// });
		}
		else {
			resp.jsonp({compile: 'failed'});	
		}
		
	});

};
