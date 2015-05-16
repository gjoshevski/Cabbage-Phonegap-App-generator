'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Application = mongoose.model('Application'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, application;

/**
 * Application routes tests
 */
describe('Application CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Application
		user.save(function() {
			application = {
				name: 'Application Name'
			};

			done();
		});
	});

	it('should be able to save Application instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Application
				agent.post('/applications')
					.send(application)
					.expect(200)
					.end(function(applicationSaveErr, applicationSaveRes) {
						// Handle Application save error
						if (applicationSaveErr) done(applicationSaveErr);

						// Get a list of Applications
						agent.get('/applications')
							.end(function(applicationsGetErr, applicationsGetRes) {
								// Handle Application save error
								if (applicationsGetErr) done(applicationsGetErr);

								// Get Applications list
								var applications = applicationsGetRes.body;

								// Set assertions
								(applications[0].user._id).should.equal(userId);
								(applications[0].name).should.match('Application Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Application instance if not logged in', function(done) {
		agent.post('/applications')
			.send(application)
			.expect(401)
			.end(function(applicationSaveErr, applicationSaveRes) {
				// Call the assertion callback
				done(applicationSaveErr);
			});
	});

	it('should not be able to save Application instance if no name is provided', function(done) {
		// Invalidate name field
		application.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Application
				agent.post('/applications')
					.send(application)
					.expect(400)
					.end(function(applicationSaveErr, applicationSaveRes) {
						// Set message assertion
						(applicationSaveRes.body.message).should.match('Please fill Application name');
						
						// Handle Application save error
						done(applicationSaveErr);
					});
			});
	});

	it('should be able to update Application instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Application
				agent.post('/applications')
					.send(application)
					.expect(200)
					.end(function(applicationSaveErr, applicationSaveRes) {
						// Handle Application save error
						if (applicationSaveErr) done(applicationSaveErr);

						// Update Application name
						application.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Application
						agent.put('/applications/' + applicationSaveRes.body._id)
							.send(application)
							.expect(200)
							.end(function(applicationUpdateErr, applicationUpdateRes) {
								// Handle Application update error
								if (applicationUpdateErr) done(applicationUpdateErr);

								// Set assertions
								(applicationUpdateRes.body._id).should.equal(applicationSaveRes.body._id);
								(applicationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Applications if not signed in', function(done) {
		// Create new Application model instance
		var applicationObj = new Application(application);

		// Save the Application
		applicationObj.save(function() {
			// Request Applications
			request(app).get('/applications')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Application if not signed in', function(done) {
		// Create new Application model instance
		var applicationObj = new Application(application);

		// Save the Application
		applicationObj.save(function() {
			request(app).get('/applications/' + applicationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', application.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Application instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Application
				agent.post('/applications')
					.send(application)
					.expect(200)
					.end(function(applicationSaveErr, applicationSaveRes) {
						// Handle Application save error
						if (applicationSaveErr) done(applicationSaveErr);

						// Delete existing Application
						agent.delete('/applications/' + applicationSaveRes.body._id)
							.send(application)
							.expect(200)
							.end(function(applicationDeleteErr, applicationDeleteRes) {
								// Handle Application error error
								if (applicationDeleteErr) done(applicationDeleteErr);

								// Set assertions
								(applicationDeleteRes.body._id).should.equal(applicationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Application instance if not signed in', function(done) {
		// Set Application user 
		application.user = user;

		// Create new Application model instance
		var applicationObj = new Application(application);

		// Save the Application
		applicationObj.save(function() {
			// Try deleting Application
			request(app).delete('/applications/' + applicationObj._id)
			.expect(401)
			.end(function(applicationDeleteErr, applicationDeleteRes) {
				// Set message assertion
				(applicationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Application error error
				done(applicationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Application.remove().exec();
		done();
	});
});