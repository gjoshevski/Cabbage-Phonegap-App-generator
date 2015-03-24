var hbs = require('hbs');
var fs = require('fs');
var wait = require('wait.for');
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

function compile() {
	// wait.launchFiber(doWork);
	var serverDir = util.serverRootPath();
	var fileData = wait.for(fs.readFile, serverDir+'/views/index_tmpl.hbs', 'utf8');
	console.log(fileData);
}

function doWork() {
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

function readFile(sourcePath, successCallback) {
	fs.readFile(sourcePath, 'utf8', function (err, data) {
		if(err) {
			throw err;
		}
		else {
			return data;
		}
	});
}

function writeFile(data, destinationPath, successCallback) {
	fs.writeFile (destinationPath, data, function(err) {
		if(err) {
			throw err;
		}
		else {
			return true;
		}
	});
}




exports.compile = compile;