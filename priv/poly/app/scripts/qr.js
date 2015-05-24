var CabbageQr = {
	init: function() {

	},
	scan: function(successCallback, errorCallback) {
		console.log('scanning');
		
		var scanner = cordova.require('cordova/plugin/BarcodeScanner');

		var ok = function(result) {
			// console.log("Scanner result: \n" +
			// 	"text: " + result.text + "\n" +
			// 	"format: " + result.format + "\n" +
			// 	"cancelled: " + result.cancelled + "\n");
			console.log(result);
			successCallback(result);
		};

		var bad = function(error) {
			console.log('Scanning failed: ', error); 
			errorCallback(error);
		};

		scanner.scan(ok, bad);
	}


};