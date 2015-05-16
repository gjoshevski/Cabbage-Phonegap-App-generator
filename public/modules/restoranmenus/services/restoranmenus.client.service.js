'use strict';

//Restoranmenus service used to communicate Restoranmenus REST endpoints
angular.module('restoranmenus').factory('Restoranmenus', ['$resource',
	function($resource) {
		return $resource('restoranmenus/:restoranmenuId', { restoranmenuId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);