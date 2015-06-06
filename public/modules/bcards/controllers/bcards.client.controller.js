'use strict';

// Bcards controller
angular.module('bcards').controller('BcardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bcards',
	function($scope, $stateParams, $location, Authentication, Bcards) {
		$scope.authentication = Authentication;

		// Create new Bcard
		$scope.create = function() {
			// Create new Bcard object
			var bcard = new Bcards ({
				name: this.bcard.name,
				appId: Authentication.user._id,
				address: this.bcard.address,
				number: this.bcard.number,
				image: this.bcard.image,
				email: this.bcard.email
			});

			// Redirect after save
			bcard.$save(function(response) {
			//	$location.path('bcards/' + response._id);
				$scope.status = "Infomrations saved";
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bcard
		$scope.remove = function(bcard) {
			if ( bcard ) { 
				bcard.$remove();

				for (var i in $scope.bcards) {
					if ($scope.bcards [i] === bcard) {
						$scope.bcards.splice(i, 1);
					}
				}
			} else {
				$scope.bcard.$remove(function() {
					$location.path('bcards');
				});
			}
		};

		// Update existing Bcard
		$scope.update = function() {
			var bcard = $scope.bcard;

			bcard.$update(function() {
				$location.path('bcards/' + bcard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bcards
		$scope.find = function() {			
			$scope.bcards = Bcards.query({bcardId: Authentication.user._id}, function(bcards) {
				    $scope.bcard = bcards[0];
					console.log(bcards);
					console.log(bcards[0]);
				});
		};

		// Find existing Bcard
		$scope.findOne = function() {
			$scope.bcard = Bcards.get({ 
				bcardId: $stateParams.bcardId
			});
		};
	}
]);