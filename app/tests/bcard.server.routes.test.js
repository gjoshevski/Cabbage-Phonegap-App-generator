'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bcard = mongoose.model('Bcard'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bcard;

/**
 * Bcard routes tests
 */
describe('Bcard CRUD tests', function() {
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

		// Save a user to the test db and create new Bcard
		user.save(function() {
			bcard = {
				name: 'Bcard Name'
			};

			done();
		});
	});

	it('should be able to save Bcard instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bcard
				agent.post('/bcards')
					.send(bcard)
					.expect(200)
					.end(function(bcardSaveErr, bcardSaveRes) {
						// Handle Bcard save error
						if (bcardSaveErr) done(bcardSaveErr);

						// Get a list of Bcards
						agent.get('/bcards')
							.end(function(bcardsGetErr, bcardsGetRes) {
								// Handle Bcard save error
								if (bcardsGetErr) done(bcardsGetErr);

								// Get Bcards list
								var bcards = bcardsGetRes.body;

								// Set assertions
								(bcards[0].user._id).should.equal(userId);
								(bcards[0].name).should.match('Bcard Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bcard instance if not logged in', function(done) {
		agent.post('/bcards')
			.send(bcard)
			.expect(401)
			.end(function(bcardSaveErr, bcardSaveRes) {
				// Call the assertion callback
				done(bcardSaveErr);
			});
	});

	it('should not be able to save Bcard instance if no name is provided', function(done) {
		// Invalidate name field
		bcard.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bcard
				agent.post('/bcards')
					.send(bcard)
					.expect(400)
					.end(function(bcardSaveErr, bcardSaveRes) {
						// Set message assertion
						(bcardSaveRes.body.message).should.match('Please fill Bcard name');
						
						// Handle Bcard save error
						done(bcardSaveErr);
					});
			});
	});

	it('should be able to update Bcard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bcard
				agent.post('/bcards')
					.send(bcard)
					.expect(200)
					.end(function(bcardSaveErr, bcardSaveRes) {
						// Handle Bcard save error
						if (bcardSaveErr) done(bcardSaveErr);

						// Update Bcard name
						bcard.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bcard
						agent.put('/bcards/' + bcardSaveRes.body._id)
							.send(bcard)
							.expect(200)
							.end(function(bcardUpdateErr, bcardUpdateRes) {
								// Handle Bcard update error
								if (bcardUpdateErr) done(bcardUpdateErr);

								// Set assertions
								(bcardUpdateRes.body._id).should.equal(bcardSaveRes.body._id);
								(bcardUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bcards if not signed in', function(done) {
		// Create new Bcard model instance
		var bcardObj = new Bcard(bcard);

		// Save the Bcard
		bcardObj.save(function() {
			// Request Bcards
			request(app).get('/bcards')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bcard if not signed in', function(done) {
		// Create new Bcard model instance
		var bcardObj = new Bcard(bcard);

		// Save the Bcard
		bcardObj.save(function() {
			request(app).get('/bcards/' + bcardObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bcard.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bcard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bcard
				agent.post('/bcards')
					.send(bcard)
					.expect(200)
					.end(function(bcardSaveErr, bcardSaveRes) {
						// Handle Bcard save error
						if (bcardSaveErr) done(bcardSaveErr);

						// Delete existing Bcard
						agent.delete('/bcards/' + bcardSaveRes.body._id)
							.send(bcard)
							.expect(200)
							.end(function(bcardDeleteErr, bcardDeleteRes) {
								// Handle Bcard error error
								if (bcardDeleteErr) done(bcardDeleteErr);

								// Set assertions
								(bcardDeleteRes.body._id).should.equal(bcardSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bcard instance if not signed in', function(done) {
		// Set Bcard user 
		bcard.user = user;

		// Create new Bcard model instance
		var bcardObj = new Bcard(bcard);

		// Save the Bcard
		bcardObj.save(function() {
			// Try deleting Bcard
			request(app).delete('/bcards/' + bcardObj._id)
			.expect(401)
			.end(function(bcardDeleteErr, bcardDeleteRes) {
				// Set message assertion
				(bcardDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bcard error error
				done(bcardDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Bcard.remove().exec();
		done();
	});
});