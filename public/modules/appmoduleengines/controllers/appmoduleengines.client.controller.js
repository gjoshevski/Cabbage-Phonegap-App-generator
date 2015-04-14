'use strict';

// Appmoduleengines controller
angular.module('appmoduleengines').controller('AppmoduleenginesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Appmoduleengines',
	function($scope, $stateParams, $location, Authentication, Appmoduleengines) {
		$scope.authentication = Authentication;

		// Create new Appmoduleengine
		$scope.create = function() {
			// Create new Appmoduleengine object
			var appmoduleengine = new Appmoduleengines ({
				name: this.name
			});

			// Redirect after save
			appmoduleengine.$save(function(response) {
				$location.path('appmoduleengines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Appmoduleengine
		$scope.remove = function(appmoduleengine) {
			if ( appmoduleengine ) { 
				appmoduleengine.$remove();

				for (var i in $scope.appmoduleengines) {
					if ($scope.appmoduleengines [i] === appmoduleengine) {
						$scope.appmoduleengines.splice(i, 1);
					}
				}
			} else {
				$scope.appmoduleengine.$remove(function() {
					$location.path('appmoduleengines');
				});
			}
		};

		// Update existing Appmoduleengine
		$scope.update = function() {
			var appmoduleengine = $scope.appmoduleengine;

			appmoduleengine.$update(function() {
				$location.path('appmoduleengines/' + appmoduleengine._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Appmoduleengines
		$scope.find = function() {
			$scope.appmoduleengines = Appmoduleengines.query();
		};

		// Find existing Appmoduleengine
		$scope.findOne = function() {
			$scope.appmoduleengine = Appmoduleengines.get({ 
				appmoduleengineId: $stateParams.appmoduleengineId
			});
		};
	}
]);