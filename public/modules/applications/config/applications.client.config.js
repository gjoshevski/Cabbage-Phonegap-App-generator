'use strict';

// Configuring the Articles module
angular.module('applications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Applications', 'applications', 'dropdown', '/applications(/create)?');
		Menus.addSubMenuItem('topbar', 'applications', 'List Applications', 'applications');
		Menus.addSubMenuItem('topbar', 'applications', 'New Application', 'applications/create');
	}
]);