'use strict';

// Applications controller
angular.module('applications').controller('ApplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Applications', 'Config',
	function($scope, $stateParams, $location, Authentication, Applications, Config) {
		$scope.authentication = Authentication;
        $scope.config = Config;
		$scope.app = [];

		
        $scope.toggleSelection = function toggleSelection(fruitName) {
            if (!$scope.app.modules) {
                $scope.app.modules = [];
            }

            var idx = $scope.app.modules.indexOf(fruitName);

            // is currently selected
            if (idx > -1) {
                $scope.app.modules.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.app.modules.push(fruitName);
            }            
            console.log($scope.app);
        };
		

		// Create new Application
		$scope.create = function() {
			
			localStorage.setItem("appUnderConstruction", $scope.application);

			
			// Create new Application object
			var application = new Applications ({
				name: this.application.name,				
			});

			// Redirect after save
			application.$save(function(response) {
				$location.path('applications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Application
		$scope.remove = function(application) {
			if ( application ) { 
				application.$remove();

				for (var i in $scope.applications) {
					if ($scope.applications [i] === application) {
						$scope.applications.splice(i, 1);
					}
				}
			} else {
				$scope.application.$remove(function() {
					$location.path('applications');
				});
			}
		};

		// Update existing Application
		$scope.update = function() {
			var application = $scope.application;

			application.$update(function() {
				$location.path('applications/' + application._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Applications
		$scope.find = function() {
			$scope.applications = Applications.query();
		};

		// Find existing Application
		$scope.findOne = function() {
			$scope.application = Applications.get({ 
				applicationId: $stateParams.applicationId
			});
		};
	}
]);