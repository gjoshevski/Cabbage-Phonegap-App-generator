'use strict';

//Bcards service used to communicate Bcards REST endpoints
angular.module('bcards').factory('Bcards', ['$resource',
	function($resource) {
		
		return $resource('bcards/:bcardId', { bcardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);