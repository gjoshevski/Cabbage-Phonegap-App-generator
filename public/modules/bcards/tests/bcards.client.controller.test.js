'use strict';

(function() {
	// Bcards Controller Spec
	describe('Bcards Controller Tests', function() {
		// Initialize global variables
		var BcardsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bcards controller.
			BcardsController = $controller('BcardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bcard object fetched from XHR', inject(function(Bcards) {
			// Create sample Bcard using the Bcards service
			var sampleBcard = new Bcards({
				name: 'New Bcard'
			});

			// Create a sample Bcards array that includes the new Bcard
			var sampleBcards = [sampleBcard];

			// Set GET response
			$httpBackend.expectGET('bcards').respond(sampleBcards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bcards).toEqualData(sampleBcards);
		}));

		it('$scope.findOne() should create an array with one Bcard object fetched from XHR using a bcardId URL parameter', inject(function(Bcards) {
			// Define a sample Bcard object
			var sampleBcard = new Bcards({
				name: 'New Bcard'
			});

			// Set the URL parameter
			$stateParams.bcardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bcards\/([0-9a-fA-F]{24})$/).respond(sampleBcard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bcard).toEqualData(sampleBcard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bcards) {
			// Create a sample Bcard object
			var sampleBcardPostData = new Bcards({
				name: 'New Bcard'
			});

			// Create a sample Bcard response
			var sampleBcardResponse = new Bcards({
				_id: '525cf20451979dea2c000001',
				name: 'New Bcard'
			});

			// Fixture mock form input values
			scope.name = 'New Bcard';

			// Set POST response
			$httpBackend.expectPOST('bcards', sampleBcardPostData).respond(sampleBcardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bcard was created
			expect($location.path()).toBe('/bcards/' + sampleBcardResponse._id);
		}));

		it('$scope.update() should update a valid Bcard', inject(function(Bcards) {
			// Define a sample Bcard put data
			var sampleBcardPutData = new Bcards({
				_id: '525cf20451979dea2c000001',
				name: 'New Bcard'
			});

			// Mock Bcard in scope
			scope.bcard = sampleBcardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bcards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bcards/' + sampleBcardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bcardId and remove the Bcard from the scope', inject(function(Bcards) {
			// Create new Bcard object
			var sampleBcard = new Bcards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bcards array and include the Bcard
			scope.bcards = [sampleBcard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bcards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBcard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bcards.length).toBe(0);
		}));
	});
}());