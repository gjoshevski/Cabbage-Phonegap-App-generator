'use strict';

//Setting up route
angular.module('bcards').config(['$stateProvider',
	function($stateProvider) {
		// Bcards state routing
		$stateProvider.
		state('listBcards', {
			url: '/bcards',
			templateUrl: 'modules/bcards/views/list-bcards.client.view.html'
		}).
		state('createBcard', {
			url: '/bcards/create',
			templateUrl: 'modules/bcards/views/create-bcard.client.view.html'
		}).
		state('viewBcard', {
			url: '/bcards/:bcardId',
			templateUrl: 'modules/bcards/views/view-bcard.client.view.html'
		}).
		state('editBcard', {
			url: '/bcards/:bcardId/edit',
			templateUrl: 'modules/bcards/views/edit-bcard.client.view.html'
		});
	}
]);