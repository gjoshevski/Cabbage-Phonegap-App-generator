'use strict';

(function() {
	// Restoranmenus Controller Spec
	describe('Restoranmenus Controller Tests', function() {
		// Initialize global variables
		var RestoranmenusController,
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

			// Initialize the Restoranmenus controller.
			RestoranmenusController = $controller('RestoranmenusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Restoranmenu object fetched from XHR', inject(function(Restoranmenus) {
			// Create sample Restoranmenu using the Restoranmenus service
			var sampleRestoranmenu = new Restoranmenus({
				name: 'New Restoranmenu'
			});

			// Create a sample Restoranmenus array that includes the new Restoranmenu
			var sampleRestoranmenus = [sampleRestoranmenu];

			// Set GET response
			$httpBackend.expectGET('restoranmenus').respond(sampleRestoranmenus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.restoranmenus).toEqualData(sampleRestoranmenus);
		}));

		it('$scope.findOne() should create an array with one Restoranmenu object fetched from XHR using a restoranmenuId URL parameter', inject(function(Restoranmenus) {
			// Define a sample Restoranmenu object
			var sampleRestoranmenu = new Restoranmenus({
				name: 'New Restoranmenu'
			});

			// Set the URL parameter
			$stateParams.restoranmenuId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/restoranmenus\/([0-9a-fA-F]{24})$/).respond(sampleRestoranmenu);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.restoranmenu).toEqualData(sampleRestoranmenu);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Restoranmenus) {
			// Create a sample Restoranmenu object
			var sampleRestoranmenuPostData = new Restoranmenus({
				name: 'New Restoranmenu'
			});

			// Create a sample Restoranmenu response
			var sampleRestoranmenuResponse = new Restoranmenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Restoranmenu'
			});

			// Fixture mock form input values
			scope.name = 'New Restoranmenu';

			// Set POST response
			$httpBackend.expectPOST('restoranmenus', sampleRestoranmenuPostData).respond(sampleRestoranmenuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Restoranmenu was created
			expect($location.path()).toBe('/restoranmenus/' + sampleRestoranmenuResponse._id);
		}));

		it('$scope.update() should update a valid Restoranmenu', inject(function(Restoranmenus) {
			// Define a sample Restoranmenu put data
			var sampleRestoranmenuPutData = new Restoranmenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Restoranmenu'
			});

			// Mock Restoranmenu in scope
			scope.restoranmenu = sampleRestoranmenuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/restoranmenus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/restoranmenus/' + sampleRestoranmenuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid restoranmenuId and remove the Restoranmenu from the scope', inject(function(Restoranmenus) {
			// Create new Restoranmenu object
			var sampleRestoranmenu = new Restoranmenus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Restoranmenus array and include the Restoranmenu
			scope.restoranmenus = [sampleRestoranmenu];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/restoranmenus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRestoranmenu);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.restoranmenus.length).toBe(0);
		}));
	});
}());