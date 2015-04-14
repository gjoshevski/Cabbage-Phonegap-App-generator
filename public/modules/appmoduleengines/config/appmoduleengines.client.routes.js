'use strict';

//Setting up route
angular.module('appmoduleengines').config(['$stateProvider',
	function($stateProvider) {
		// Appmoduleengines state routing
		$stateProvider.
		state('listAppmoduleengines', {
			url: '/appmoduleengines',
			templateUrl: 'modules/appmoduleengines/views/list-appmoduleengines.client.view.html'
		}).
		state('createAppmoduleengine', {
			url: '/appmoduleengines/create',
			templateUrl: 'modules/appmoduleengines/views/create-appmoduleengine.client.view.html'
		}).
		state('viewAppmoduleengine', {
			url: '/appmoduleengines/:appmoduleengineId',
			templateUrl: 'modules/appmoduleengines/views/view-appmoduleengine.client.view.html'
		}).
		state('editAppmoduleengine', {
			url: '/appmoduleengines/:appmoduleengineId/edit',
			templateUrl: 'modules/appmoduleengines/views/edit-appmoduleengine.client.view.html'
		});
	}
]);