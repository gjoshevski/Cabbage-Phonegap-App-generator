'use strict';

// News controller
angular.module('news').controller('NewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'News', '$http',
	function($scope, $stateParams, $location, Authentication, News, $http) {
		$scope.authentication = Authentication;

		// Create new News
		$scope.create = function() {
			// Create new News object
			var news = new News ({
				title: this.name,
				appId: Authentication.user._id,
				user: Authentication.user,
				newsUrl: this.newsUrl
			});

			// Redirect after save
			news.$save(function(response) {
				//$location.path('news/' + response._id);
				
				$scope.status = 'Saved';
				location.reload();
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing News
		$scope.remove = function(news) {
			if ( news ) { 
				news.$remove();

				for (var i in $scope.news) {
					if ($scope.news [i] === news) {
						$scope.news.splice(i, 1);
					}
				}
			} else {
				$scope.news.$remove(function() {
					$location.path('news');
				});
			}
		};

		// Update existing News
		$scope.update = function() {
			var news = $scope.news;

			news.$update(function() {
				$location.path('news/' + news._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of News
		$scope.find = function() {
			
			// Simple GET request example :
			$http.get('/news/byappid/'+Authentication.user._id).
			  success(function(data, status, headers, config) {
			   $scope.news = data; 
			   console.log(status);
			  }).
			  error(function(data, status, headers, config) {
			   console.log(status);
			  });
			
			//$scope.news = News.query({appid: Authentication.user._id});
		};

		// Find existing News
		$scope.findOne = function() {
			$scope.news = News.get({ 
				newsId: $stateParams.newsId
			});
		};
	}
]);