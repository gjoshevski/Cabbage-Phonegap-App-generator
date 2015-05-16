'use strict';

(function() {
	// Qrpoints Controller Spec
	describe('Qrpoints Controller Tests', function() {
		// Initialize global variables
		var QrpointsController,
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

			// Initialize the Qrpoints controller.
			QrpointsController = $controller('QrpointsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Qrpoint object fetched from XHR', inject(function(Qrpoints) {
			// Create sample Qrpoint using the Qrpoints service
			var sampleQrpoint = new Qrpoints({
				name: 'New Qrpoint'
			});

			// Create a sample Qrpoints array that includes the new Qrpoint
			var sampleQrpoints = [sampleQrpoint];

			// Set GET response
			$httpBackend.expectGET('qrpoints').respond(sampleQrpoints);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qrpoints).toEqualData(sampleQrpoints);
		}));

		it('$scope.findOne() should create an array with one Qrpoint object fetched from XHR using a qrpointId URL parameter', inject(function(Qrpoints) {
			// Define a sample Qrpoint object
			var sampleQrpoint = new Qrpoints({
				name: 'New Qrpoint'
			});

			// Set the URL parameter
			$stateParams.qrpointId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/qrpoints\/([0-9a-fA-F]{24})$/).respond(sampleQrpoint);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qrpoint).toEqualData(sampleQrpoint);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Qrpoints) {
			// Create a sample Qrpoint object
			var sampleQrpointPostData = new Qrpoints({
				name: 'New Qrpoint'
			});

			// Create a sample Qrpoint response
			var sampleQrpointResponse = new Qrpoints({
				_id: '525cf20451979dea2c000001',
				name: 'New Qrpoint'
			});

			// Fixture mock form input values
			scope.name = 'New Qrpoint';

			// Set POST response
			$httpBackend.expectPOST('qrpoints', sampleQrpointPostData).respond(sampleQrpointResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Qrpoint was created
			expect($location.path()).toBe('/qrpoints/' + sampleQrpointResponse._id);
		}));

		it('$scope.update() should update a valid Qrpoint', inject(function(Qrpoints) {
			// Define a sample Qrpoint put data
			var sampleQrpointPutData = new Qrpoints({
				_id: '525cf20451979dea2c000001',
				name: 'New Qrpoint'
			});

			// Mock Qrpoint in scope
			scope.qrpoint = sampleQrpointPutData;

			// Set PUT response
			$httpBackend.expectPUT(/qrpoints\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/qrpoints/' + sampleQrpointPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid qrpointId and remove the Qrpoint from the scope', inject(function(Qrpoints) {
			// Create new Qrpoint object
			var sampleQrpoint = new Qrpoints({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Qrpoints array and include the Qrpoint
			scope.qrpoints = [sampleQrpoint];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/qrpoints\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleQrpoint);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.qrpoints.length).toBe(0);
		}));
	});
}());