'use strict';

(function() {
	// Appmoduleengines Controller Spec
	describe('Appmoduleengines Controller Tests', function() {
		// Initialize global variables
		var AppmoduleenginesController,
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

			// Initialize the Appmoduleengines controller.
			AppmoduleenginesController = $controller('AppmoduleenginesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Appmoduleengine object fetched from XHR', inject(function(Appmoduleengines) {
			// Create sample Appmoduleengine using the Appmoduleengines service
			var sampleAppmoduleengine = new Appmoduleengines({
				name: 'New Appmoduleengine'
			});

			// Create a sample Appmoduleengines array that includes the new Appmoduleengine
			var sampleAppmoduleengines = [sampleAppmoduleengine];

			// Set GET response
			$httpBackend.expectGET('appmoduleengines').respond(sampleAppmoduleengines);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appmoduleengines).toEqualData(sampleAppmoduleengines);
		}));

		it('$scope.findOne() should create an array with one Appmoduleengine object fetched from XHR using a appmoduleengineId URL parameter', inject(function(Appmoduleengines) {
			// Define a sample Appmoduleengine object
			var sampleAppmoduleengine = new Appmoduleengines({
				name: 'New Appmoduleengine'
			});

			// Set the URL parameter
			$stateParams.appmoduleengineId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/appmoduleengines\/([0-9a-fA-F]{24})$/).respond(sampleAppmoduleengine);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appmoduleengine).toEqualData(sampleAppmoduleengine);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Appmoduleengines) {
			// Create a sample Appmoduleengine object
			var sampleAppmoduleenginePostData = new Appmoduleengines({
				name: 'New Appmoduleengine'
			});

			// Create a sample Appmoduleengine response
			var sampleAppmoduleengineResponse = new Appmoduleengines({
				_id: '525cf20451979dea2c000001',
				name: 'New Appmoduleengine'
			});

			// Fixture mock form input values
			scope.name = 'New Appmoduleengine';

			// Set POST response
			$httpBackend.expectPOST('appmoduleengines', sampleAppmoduleenginePostData).respond(sampleAppmoduleengineResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Appmoduleengine was created
			expect($location.path()).toBe('/appmoduleengines/' + sampleAppmoduleengineResponse._id);
		}));

		it('$scope.update() should update a valid Appmoduleengine', inject(function(Appmoduleengines) {
			// Define a sample Appmoduleengine put data
			var sampleAppmoduleenginePutData = new Appmoduleengines({
				_id: '525cf20451979dea2c000001',
				name: 'New Appmoduleengine'
			});

			// Mock Appmoduleengine in scope
			scope.appmoduleengine = sampleAppmoduleenginePutData;

			// Set PUT response
			$httpBackend.expectPUT(/appmoduleengines\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/appmoduleengines/' + sampleAppmoduleenginePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid appmoduleengineId and remove the Appmoduleengine from the scope', inject(function(Appmoduleengines) {
			// Create new Appmoduleengine object
			var sampleAppmoduleengine = new Appmoduleengines({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Appmoduleengines array and include the Appmoduleengine
			scope.appmoduleengines = [sampleAppmoduleengine];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/appmoduleengines\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAppmoduleengine);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.appmoduleengines.length).toBe(0);
		}));
	});
}());