'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Appmoduleengine = mongoose.model('Appmoduleengine'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, appmoduleengine;

/**
 * Appmoduleengine routes tests
 */
describe('Appmoduleengine CRUD tests', function() {
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

		// Save a user to the test db and create new Appmoduleengine
		user.save(function() {
			appmoduleengine = {
				name: 'Appmoduleengine Name'
			};

			done();
		});
	});

	it('should be able to save Appmoduleengine instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appmoduleengine
				agent.post('/appmoduleengines')
					.send(appmoduleengine)
					.expect(200)
					.end(function(appmoduleengineSaveErr, appmoduleengineSaveRes) {
						// Handle Appmoduleengine save error
						if (appmoduleengineSaveErr) done(appmoduleengineSaveErr);

						// Get a list of Appmoduleengines
						agent.get('/appmoduleengines')
							.end(function(appmoduleenginesGetErr, appmoduleenginesGetRes) {
								// Handle Appmoduleengine save error
								if (appmoduleenginesGetErr) done(appmoduleenginesGetErr);

								// Get Appmoduleengines list
								var appmoduleengines = appmoduleenginesGetRes.body;

								// Set assertions
								(appmoduleengines[0].user._id).should.equal(userId);
								(appmoduleengines[0].name).should.match('Appmoduleengine Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Appmoduleengine instance if not logged in', function(done) {
		agent.post('/appmoduleengines')
			.send(appmoduleengine)
			.expect(401)
			.end(function(appmoduleengineSaveErr, appmoduleengineSaveRes) {
				// Call the assertion callback
				done(appmoduleengineSaveErr);
			});
	});

	it('should not be able to save Appmoduleengine instance if no name is provided', function(done) {
		// Invalidate name field
		appmoduleengine.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appmoduleengine
				agent.post('/appmoduleengines')
					.send(appmoduleengine)
					.expect(400)
					.end(function(appmoduleengineSaveErr, appmoduleengineSaveRes) {
						// Set message assertion
						(appmoduleengineSaveRes.body.message).should.match('Please fill Appmoduleengine name');
						
						// Handle Appmoduleengine save error
						done(appmoduleengineSaveErr);
					});
			});
	});

	it('should be able to update Appmoduleengine instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appmoduleengine
				agent.post('/appmoduleengines')
					.send(appmoduleengine)
					.expect(200)
					.end(function(appmoduleengineSaveErr, appmoduleengineSaveRes) {
						// Handle Appmoduleengine save error
						if (appmoduleengineSaveErr) done(appmoduleengineSaveErr);

						// Update Appmoduleengine name
						appmoduleengine.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Appmoduleengine
						agent.put('/appmoduleengines/' + appmoduleengineSaveRes.body._id)
							.send(appmoduleengine)
							.expect(200)
							.end(function(appmoduleengineUpdateErr, appmoduleengineUpdateRes) {
								// Handle Appmoduleengine update error
								if (appmoduleengineUpdateErr) done(appmoduleengineUpdateErr);

								// Set assertions
								(appmoduleengineUpdateRes.body._id).should.equal(appmoduleengineSaveRes.body._id);
								(appmoduleengineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Appmoduleengines if not signed in', function(done) {
		// Create new Appmoduleengine model instance
		var appmoduleengineObj = new Appmoduleengine(appmoduleengine);

		// Save the Appmoduleengine
		appmoduleengineObj.save(function() {
			// Request Appmoduleengines
			request(app).get('/appmoduleengines')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Appmoduleengine if not signed in', function(done) {
		// Create new Appmoduleengine model instance
		var appmoduleengineObj = new Appmoduleengine(appmoduleengine);

		// Save the Appmoduleengine
		appmoduleengineObj.save(function() {
			request(app).get('/appmoduleengines/' + appmoduleengineObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', appmoduleengine.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Appmoduleengine instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appmoduleengine
				agent.post('/appmoduleengines')
					.send(appmoduleengine)
					.expect(200)
					.end(function(appmoduleengineSaveErr, appmoduleengineSaveRes) {
						// Handle Appmoduleengine save error
						if (appmoduleengineSaveErr) done(appmoduleengineSaveErr);

						// Delete existing Appmoduleengine
						agent.delete('/appmoduleengines/' + appmoduleengineSaveRes.body._id)
							.send(appmoduleengine)
							.expect(200)
							.end(function(appmoduleengineDeleteErr, appmoduleengineDeleteRes) {
								// Handle Appmoduleengine error error
								if (appmoduleengineDeleteErr) done(appmoduleengineDeleteErr);

								// Set assertions
								(appmoduleengineDeleteRes.body._id).should.equal(appmoduleengineSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Appmoduleengine instance if not signed in', function(done) {
		// Set Appmoduleengine user 
		appmoduleengine.user = user;

		// Create new Appmoduleengine model instance
		var appmoduleengineObj = new Appmoduleengine(appmoduleengine);

		// Save the Appmoduleengine
		appmoduleengineObj.save(function() {
			// Try deleting Appmoduleengine
			request(app).delete('/appmoduleengines/' + appmoduleengineObj._id)
			.expect(401)
			.end(function(appmoduleengineDeleteErr, appmoduleengineDeleteRes) {
				// Set message assertion
				(appmoduleengineDeleteRes.body.message).should.match('User is not logged in');

				// Handle Appmoduleengine error error
				done(appmoduleengineDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Appmoduleengine.remove().exec();
		done();
	});
});