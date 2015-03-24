var hbs = require('hbs');
var fs = require('fs');
var wait = require('wait.for');
var exec = require('child_process').exec;

var util = require('./util');

var config =  {
		modules: [
			{
				name: "Greeting",
				key: "yo-greeting",
				element: "yo-greeting"
			},
			{
				name: "List",
				key: "yo-list",
				element: "yo-list"
			}
		]
	};

var outputDir =  "/priv/cordova/tmp";

function render() {
	// wait.launchFiber(_render);
	var serverDir = util.serverRootPath();
	var fileData = wait.for(fs.readFile, serverDir+'/views/index_tmpl.hbs', 'utf8');
	console.log(fileData);
}

function _render() {
	var serverDir = util.serverRootPath();
	var fileData = wait.for(fs.readFile, serverDir+'/views/index_tmpl.hbs', 'utf8');
	if(fileData !== false) {
		var result = wait.for(fs.writeFile, serverDir+outputDir+'/index.html', fileData);
		return result;
	}
	else {
		return false;
	}
}

function compile(resp) {
	// var stdout = wait.for(exec, 'sh '+util.serverRootPath()+'/script/compile.sh | tail');

	function done(stdout) {
		console.log("***" + stdout);
		if(buildCompleted(stdout) === true) {
			resp.send("Done.");
		}
		else {
			resp.status(500);
			resp.send("Fuk!1");	
		}
	}

	exec('sh '+util.serverRootPath()+'/script/compile.sh | tail', function(error, stdout, stderr){
		done(stdout);
	});
}

function buildCompleted(stdout) {
	if(stdout.indexOf("BUILD SUCCESSFUL") >= 0) {
		return true;
	}
	else {
		return false;
	}
}

function getApk(resp) {
	fs.readFile('/Users/viktorot/Desktop/tmp/phonegap-test/hello/platforms/android/ant-build/MainActivity-debug.apk', function(err, data) {
		if(!err) {
			resp.setHeader("Content-Length", data.length);
			resp.setHeader("Content-Type", 'application/vnd.android.package-archive');
			resp.setHeader("Content-Disposition", 'attachment; filename=install.apk');
			resp.statusCode = 200;
			resp.end(data);
		} else {
			resp.writeHead(500);
			resp.end();
		}
	});
}




module.exports.render = render;
module.exports.compile = compile;