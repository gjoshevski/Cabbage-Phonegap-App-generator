'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Qrpoint = mongoose.model('Qrpoint'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, qrpoint;

/**
 * Qrpoint routes tests
 */
describe('Qrpoint CRUD tests', function() {
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

		// Save a user to the test db and create new Qrpoint
		user.save(function() {
			qrpoint = {
				name: 'Qrpoint Name'
			};

			done();
		});
	});

	it('should be able to save Qrpoint instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qrpoint
				agent.post('/qrpoints')
					.send(qrpoint)
					.expect(200)
					.end(function(qrpointSaveErr, qrpointSaveRes) {
						// Handle Qrpoint save error
						if (qrpointSaveErr) done(qrpointSaveErr);

						// Get a list of Qrpoints
						agent.get('/qrpoints')
							.end(function(qrpointsGetErr, qrpointsGetRes) {
								// Handle Qrpoint save error
								if (qrpointsGetErr) done(qrpointsGetErr);

								// Get Qrpoints list
								var qrpoints = qrpointsGetRes.body;

								// Set assertions
								(qrpoints[0].user._id).should.equal(userId);
								(qrpoints[0].name).should.match('Qrpoint Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Qrpoint instance if not logged in', function(done) {
		agent.post('/qrpoints')
			.send(qrpoint)
			.expect(401)
			.end(function(qrpointSaveErr, qrpointSaveRes) {
				// Call the assertion callback
				done(qrpointSaveErr);
			});
	});

	it('should not be able to save Qrpoint instance if no name is provided', function(done) {
		// Invalidate name field
		qrpoint.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qrpoint
				agent.post('/qrpoints')
					.send(qrpoint)
					.expect(400)
					.end(function(qrpointSaveErr, qrpointSaveRes) {
						// Set message assertion
						(qrpointSaveRes.body.message).should.match('Please fill Qrpoint name');
						
						// Handle Qrpoint save error
						done(qrpointSaveErr);
					});
			});
	});

	it('should be able to update Qrpoint instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qrpoint
				agent.post('/qrpoints')
					.send(qrpoint)
					.expect(200)
					.end(function(qrpointSaveErr, qrpointSaveRes) {
						// Handle Qrpoint save error
						if (qrpointSaveErr) done(qrpointSaveErr);

						// Update Qrpoint name
						qrpoint.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Qrpoint
						agent.put('/qrpoints/' + qrpointSaveRes.body._id)
							.send(qrpoint)
							.expect(200)
							.end(function(qrpointUpdateErr, qrpointUpdateRes) {
								// Handle Qrpoint update error
								if (qrpointUpdateErr) done(qrpointUpdateErr);

								// Set assertions
								(qrpointUpdateRes.body._id).should.equal(qrpointSaveRes.body._id);
								(qrpointUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Qrpoints if not signed in', function(done) {
		// Create new Qrpoint model instance
		var qrpointObj = new Qrpoint(qrpoint);

		// Save the Qrpoint
		qrpointObj.save(function() {
			// Request Qrpoints
			request(app).get('/qrpoints')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Qrpoint if not signed in', function(done) {
		// Create new Qrpoint model instance
		var qrpointObj = new Qrpoint(qrpoint);

		// Save the Qrpoint
		qrpointObj.save(function() {
			request(app).get('/qrpoints/' + qrpointObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', qrpoint.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Qrpoint instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qrpoint
				agent.post('/qrpoints')
					.send(qrpoint)
					.expect(200)
					.end(function(qrpointSaveErr, qrpointSaveRes) {
						// Handle Qrpoint save error
						if (qrpointSaveErr) done(qrpointSaveErr);

						// Delete existing Qrpoint
						agent.delete('/qrpoints/' + qrpointSaveRes.body._id)
							.send(qrpoint)
							.expect(200)
							.end(function(qrpointDeleteErr, qrpointDeleteRes) {
								// Handle Qrpoint error error
								if (qrpointDeleteErr) done(qrpointDeleteErr);

								// Set assertions
								(qrpointDeleteRes.body._id).should.equal(qrpointSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Qrpoint instance if not signed in', function(done) {
		// Set Qrpoint user 
		qrpoint.user = user;

		// Create new Qrpoint model instance
		var qrpointObj = new Qrpoint(qrpoint);

		// Save the Qrpoint
		qrpointObj.save(function() {
			// Try deleting Qrpoint
			request(app).delete('/qrpoints/' + qrpointObj._id)
			.expect(401)
			.end(function(qrpointDeleteErr, qrpointDeleteRes) {
				// Set message assertion
				(qrpointDeleteRes.body.message).should.match('User is not logged in');

				// Handle Qrpoint error error
				done(qrpointDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Qrpoint.remove().exec();
		done();
	});
});