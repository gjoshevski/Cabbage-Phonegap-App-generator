'use strict';

// Qrpoints controller
angular.module('qrpoints').controller('QrpointsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Qrpoints',
	function($scope, $stateParams, $location, Authentication, Qrpoints) {
		$scope.authentication = Authentication;

		// Create new Qrpoint
		$scope.create = function() {
			// Create new Qrpoint object
			var qrpoint = new Qrpoints ({
				name: this.name
			});

			// Redirect after save
			qrpoint.$save(function(response) {
				$location.path('qrpoints/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Qrpoint
		$scope.remove = function(qrpoint) {
			if ( qrpoint ) { 
				qrpoint.$remove();

				for (var i in $scope.qrpoints) {
					if ($scope.qrpoints [i] === qrpoint) {
						$scope.qrpoints.splice(i, 1);
					}
				}
			} else {
				$scope.qrpoint.$remove(function() {
					$location.path('qrpoints');
				});
			}
		};

		// Update existing Qrpoint
		$scope.update = function() {
			var qrpoint = $scope.qrpoint;

			qrpoint.$update(function() {
				$location.path('qrpoints/' + qrpoint._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Qrpoints
		$scope.find = function() {
			$scope.qrpoints = Qrpoints.query();
		};

		// Find existing Qrpoint
		$scope.findOne = function() {
			$scope.qrpoint = Qrpoints.get({ 
				qrpointId: $stateParams.qrpointId
			});
		};
	}
]);