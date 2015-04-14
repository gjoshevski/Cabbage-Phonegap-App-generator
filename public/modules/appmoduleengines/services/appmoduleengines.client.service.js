'use strict';

//Appmoduleengines service used to communicate Appmoduleengines REST endpoints
angular.module('appmoduleengines').factory('Appmoduleengines', ['$resource',
	function($resource) {
		return $resource('appmoduleengines/:appmoduleengineId', { appmoduleengineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);