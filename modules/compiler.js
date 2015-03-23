var handlebars = require('hbs');
var fs = require('fs');

var Compiler = {
	config: {
		modules: [
			{
				name: "Info",
				key: "info",
				element: "cabbale-info"
			}
		]
	},
	compile: function(config) {

	},
	readFile: function(sourcePath, successCallback) {
		fs.readFile(sourcePath, 'utf8', function (err, data) {
			if (err)  {
				throw err;
			}
			else {
				successCallback(data);	
			}
		});
	},
	writeFile: function(data, destinationPath, successCallback) {
		fs.writeFile (destinationPath, data, function(err) {
			if (err)  {
				throw err;
			}
			else {
				successCallback();
			}
		});
	}
};