'use strict';

//Setting up route
angular.module('restoranmenus').config(['$stateProvider',
	function($stateProvider) {
		// Restoranmenus state routing
		$stateProvider.
		state('listRestoranmenus', {
			url: '/restoranmenus',
			templateUrl: 'modules/restoranmenus/views/list-restoranmenus.client.view.html'
		}).
		state('createRestoranmenu', {
			url: '/restoranmenus/create',
			templateUrl: 'modules/restoranmenus/views/create-restoranmenu.client.view.html'
		}).
		state('viewRestoranmenu', {
			url: '/restoranmenus/:restoranmenuId',
			templateUrl: 'modules/restoranmenus/views/view-restoranmenu.client.view.html'
		}).
		state('editRestoranmenu', {
			url: '/restoranmenus/:restoranmenuId/edit',
			templateUrl: 'modules/restoranmenus/views/edit-restoranmenu.client.view.html'
		});
	}
]);