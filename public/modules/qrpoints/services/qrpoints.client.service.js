'use strict';

//Qrpoints service used to communicate Qrpoints REST endpoints
angular.module('qrpoints').factory('Qrpoints', ['$resource',
	function($resource) {
		return $resource('qrpoints/:qrpointId', { qrpointId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);