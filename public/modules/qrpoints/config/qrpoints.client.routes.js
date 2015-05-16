'use strict';

//Setting up route
angular.module('qrpoints').config(['$stateProvider',
	function($stateProvider) {
		// Qrpoints state routing
		$stateProvider.
		state('listQrpoints', {
			url: '/qrpoints',
			templateUrl: 'modules/qrpoints/views/list-qrpoints.client.view.html'
		}).
		state('createQrpoint', {
			url: '/qrpoints/create',
			templateUrl: 'modules/qrpoints/views/create-qrpoint.client.view.html'
		}).
		state('viewQrpoint', {
			url: '/qrpoints/:qrpointId',
			templateUrl: 'modules/qrpoints/views/view-qrpoint.client.view.html'
		}).
		state('editQrpoint', {
			url: '/qrpoints/:qrpointId/edit',
			templateUrl: 'modules/qrpoints/views/edit-qrpoint.client.view.html'
		});
	}
]);