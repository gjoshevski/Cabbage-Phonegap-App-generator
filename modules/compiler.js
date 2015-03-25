var hbs = require('hbs');
var fs = require('fs');
var wait = require('wait.for');
var exec = require('child_process').exec;

var util = require('./util');

var outputDir =  '/priv/cordova/www';
var apkPath = '/priv/cordova/platforms/android/ant-build/MainActivity-debug.apk';

function compile(reqBody, resp) {
	var count = 0;
	var modules = reqBody.modules.map(function(mod) {
		count++;
		return {
			name: 'Module ' + count,
			key: mod,
			element: mod
		};
	});

	var config = {
		defaultModule: modules[0].key,
		appName: reqBody.appName,
		modules: modules
	};

	// console.log(config);
	_compile(config, resp);
}
 
function _compile(config, resp) {
	// var stdout = wait.for(exec, 'sh '+util.serverRootPath()+'/script/compile.sh | tail');
	if(render(config) === true) {

		function done(stdout) {
			if(buildCompleted(stdout) === true) {
				// resp.send('<3');
				returnApk(config.appName, resp);
			}
			else {
				console.error('compiler.js | apk read error');
				resp.status(500);
				resp.send('Fuk!1');	
			}
		}

		var moduleList = config.modules.map(function(elem) { return elem.element }).join(' ');
		exec('sh '+util.serverRootPath()+'/script/compile.sh '+ moduleList +' | tail', function(error, stdout, stderr){
			done(stdout);
		});	
	}
	else {
		console.error('compiler.js | index.html render error');
		resp.status(500);
		resp.send('Fuk!1');	
	}
	

}

function render(config) {	
	var fileData = wait.for(fs.readFile, util.serverRootPath()+'/views/index_tmpl.hbs', 'utf8');
	if(fileData !== false) {
		var tmpl = hbs.compile(fileData);
		var source = tmpl(config);
		wait.for(fs.writeFile, util.serverRootPath()+outputDir+'/index.html', source);
		return true;
	}
	else {
		return false;
	}
}

function buildCompleted(stdout) {
	if(stdout.indexOf('BUILD SUCCESSFUL') >= 0) {
		return true;
	}
	else {
		return false;
	}
}

function returnApk(appName, resp) {
	fs.readFile(util.serverRootPath()+apkPath, function(err, data) {
		if(!err) {
			resp.set('Content-Length', data.length);
			resp.set('Content-Type', 'application/vnd.android.package-archive');
			resp.set('Content-Disposition', 'attachment; filename='+ appName +'.apk');
			resp.status(200);
			resp.end(data);
		} else {
			console.log("compiler.js | get apk error");
			resp.status(500);
			resp.end();
		}
	});
}




module.exports.render = render;
module.exports.compile = compile;