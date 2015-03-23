var handlebars = require('express-handlebars');
var fs = require('fs');

var config =  {
		modules: [
			{
				name: "Info",
				key: "info",
				element: "cabbale-info"
			}
		]
	};

var outputDir =  "/Users/viktorot/SchoolProjects/cabbage-mobile/";

function compile() {

	var hbs = handlebars.create();

	console.log(hbs);

	function readSuccess(data) {
		var tmpl = hbs.compile(data);
		var source = tmpl(config);
		writeFile(outputDir+'/index.html', source, function() { console.log('Happy :)'); });
	}
	
	var serverDir = '/Users/viktorot/SchoolProjects/cabbage-core/'; //__dirname.split("/").splice();
	readFile(serverDir+'views/index_tmpl.handlebars', readSuccess);
}

function readFile(sourcePath, successCallback) {
	fs.readFile(sourcePath, 'utf8', function (err, data) {
		if (err)  {
			throw err;
		}
		else {
			successCallback(data);	
		}
	});
}

function writeFile(data, destinationPath, successCallback) {
	fs.writeFile (destinationPath, data, function(err) {
		if (err)  {
			throw err;
		}
		else {
			successCallback();
		}
	});
}




exports.compile = compile;