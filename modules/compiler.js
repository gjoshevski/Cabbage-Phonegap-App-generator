var hbs = require('hbs');
var fs = require('fs');
var wait = require('wait.for');
var exec = require('child_process').exec;

var util = require('./util');

var config =  {
		default_module: "yo-greeting",
		modules: [
			{
				name: "Greeting",
				key: "yo-greeting",
				element: "yo-greeting"
			}
			// },
			// {
			// 	name: "List",
			// 	key: "yo-list",
			// 	element: "yo-list"
			// }
		]
	};

var outputDir =  '/priv/cordova/www';
var apkPath = '/priv/cordova/platforms/android/ant-build/MainActivity-debug.apk';

function compile(resp) {
	// var stdout = wait.for(exec, 'sh '+util.serverRootPath()+'/script/compile.sh | tail');
	if(render() === true) {

		function done(stdout) {
			if(buildCompleted(stdout) === true) {
				returnApk(resp);
			}
			else {
				console.error("compiler.js | apk read error");
				resp.status(500);
				resp.send("Fuk!1");	
			}
		}

		exec('sh '+util.serverRootPath()+'/script/compile.sh yo-greeting | tail', function(error, stdout, stderr){
			done(stdout);
		});		
	}
	else {
		console.error("compiler.js | index.html render error");
		resp.status(500);
		resp.send("Fuk!1");	
	}
	

}

function render() {
	var serverDir = util.serverRootPath();
	var fileData = wait.for(fs.readFile, serverDir+'/views/index_tmpl.hbs', 'utf8');
	if(fileData !== false) {
		var tmpl = hbs.compile(fileData);
		var source = tmpl(config);
		wait.for(fs.writeFile, serverDir+outputDir+'/index.html', source);
		return true;
	}
	else {
		return false;
	}
}

function buildCompleted(stdout) {
	if(stdout.indexOf("BUILD SUCCESSFUL") >= 0) {
		return true;
	}
	else {
		return false;
	}
}

function returnApk(resp) {
	fs.readFile(util.serverRootPath()+apkPath, function(err, data) {
		if(!err) {
			resp.set("Content-Length", data.length);
			resp.set("Content-Type", 'application/vnd.android.package-archive');
			resp.set("Content-Disposition", 'attachment; filename=install.apk');
			resp.status(200);
			resp.end(data);
		} else {
			resp.status(500);
			resp.end();
		}
	});
}




module.exports.render = render;
module.exports.compile = compile;