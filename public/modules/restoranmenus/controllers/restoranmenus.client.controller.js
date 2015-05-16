'use strict';

// Restoranmenus controller
angular.module('restoranmenus').controller('RestoranmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Restoranmenus',
	function($scope, $stateParams, $location, Authentication, Restoranmenus) {
		$scope.authentication = Authentication;

		// Create new Restoranmenu
		$scope.create = function() {
			// Create new Restoranmenu object
			var restoranmenu = new Restoranmenus ({
				name: this.name
			});

			// Redirect after save
			restoranmenu.$save(function(response) {
				$location.path('restoranmenus/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Restoranmenu
		$scope.remove = function(restoranmenu) {
			if ( restoranmenu ) { 
				restoranmenu.$remove();

				for (var i in $scope.restoranmenus) {
					if ($scope.restoranmenus [i] === restoranmenu) {
						$scope.restoranmenus.splice(i, 1);
					}
				}
			} else {
				$scope.restoranmenu.$remove(function() {
					$location.path('restoranmenus');
				});
			}
		};

		// Update existing Restoranmenu
		$scope.update = function() {
			var restoranmenu = $scope.restoranmenu;

			restoranmenu.$update(function() {
				$location.path('restoranmenus/' + restoranmenu._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Restoranmenus
		$scope.find = function() {
			$scope.restoranmenus = Restoranmenus.query();
		};

		// Find existing Restoranmenu
		$scope.findOne = function() {
			$scope.restoranmenu = Restoranmenus.get({ 
				restoranmenuId: $stateParams.restoranmenuId
			});
		};
	}
]);