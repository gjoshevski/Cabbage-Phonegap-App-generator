'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Restoranmenu = mongoose.model('Restoranmenu'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, restoranmenu;

/**
 * Restoranmenu routes tests
 */
describe('Restoranmenu CRUD tests', function() {
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

		// Save a user to the test db and create new Restoranmenu
		user.save(function() {
			restoranmenu = {
				name: 'Restoranmenu Name'
			};

			done();
		});
	});

	it('should be able to save Restoranmenu instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Restoranmenu
				agent.post('/restoranmenus')
					.send(restoranmenu)
					.expect(200)
					.end(function(restoranmenuSaveErr, restoranmenuSaveRes) {
						// Handle Restoranmenu save error
						if (restoranmenuSaveErr) done(restoranmenuSaveErr);

						// Get a list of Restoranmenus
						agent.get('/restoranmenus')
							.end(function(restoranmenusGetErr, restoranmenusGetRes) {
								// Handle Restoranmenu save error
								if (restoranmenusGetErr) done(restoranmenusGetErr);

								// Get Restoranmenus list
								var restoranmenus = restoranmenusGetRes.body;

								// Set assertions
								(restoranmenus[0].user._id).should.equal(userId);
								(restoranmenus[0].name).should.match('Restoranmenu Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Restoranmenu instance if not logged in', function(done) {
		agent.post('/restoranmenus')
			.send(restoranmenu)
			.expect(401)
			.end(function(restoranmenuSaveErr, restoranmenuSaveRes) {
				// Call the assertion callback
				done(restoranmenuSaveErr);
			});
	});

	it('should not be able to save Restoranmenu instance if no name is provided', function(done) {
		// Invalidate name field
		restoranmenu.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Restoranmenu
				agent.post('/restoranmenus')
					.send(restoranmenu)
					.expect(400)
					.end(function(restoranmenuSaveErr, restoranmenuSaveRes) {
						// Set message assertion
						(restoranmenuSaveRes.body.message).should.match('Please fill Restoranmenu name');
						
						// Handle Restoranmenu save error
						done(restoranmenuSaveErr);
					});
			});
	});

	it('should be able to update Restoranmenu instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Restoranmenu
				agent.post('/restoranmenus')
					.send(restoranmenu)
					.expect(200)
					.end(function(restoranmenuSaveErr, restoranmenuSaveRes) {
						// Handle Restoranmenu save error
						if (restoranmenuSaveErr) done(restoranmenuSaveErr);

						// Update Restoranmenu name
						restoranmenu.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Restoranmenu
						agent.put('/restoranmenus/' + restoranmenuSaveRes.body._id)
							.send(restoranmenu)
							.expect(200)
							.end(function(restoranmenuUpdateErr, restoranmenuUpdateRes) {
								// Handle Restoranmenu update error
								if (restoranmenuUpdateErr) done(restoranmenuUpdateErr);

								// Set assertions
								(restoranmenuUpdateRes.body._id).should.equal(restoranmenuSaveRes.body._id);
								(restoranmenuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Restoranmenus if not signed in', function(done) {
		// Create new Restoranmenu model instance
		var restoranmenuObj = new Restoranmenu(restoranmenu);

		// Save the Restoranmenu
		restoranmenuObj.save(function() {
			// Request Restoranmenus
			request(app).get('/restoranmenus')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Restoranmenu if not signed in', function(done) {
		// Create new Restoranmenu model instance
		var restoranmenuObj = new Restoranmenu(restoranmenu);

		// Save the Restoranmenu
		restoranmenuObj.save(function() {
			request(app).get('/restoranmenus/' + restoranmenuObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', restoranmenu.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Restoranmenu instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Restoranmenu
				agent.post('/restoranmenus')
					.send(restoranmenu)
					.expect(200)
					.end(function(restoranmenuSaveErr, restoranmenuSaveRes) {
						// Handle Restoranmenu save error
						if (restoranmenuSaveErr) done(restoranmenuSaveErr);

						// Delete existing Restoranmenu
						agent.delete('/restoranmenus/' + restoranmenuSaveRes.body._id)
							.send(restoranmenu)
							.expect(200)
							.end(function(restoranmenuDeleteErr, restoranmenuDeleteRes) {
								// Handle Restoranmenu error error
								if (restoranmenuDeleteErr) done(restoranmenuDeleteErr);

								// Set assertions
								(restoranmenuDeleteRes.body._id).should.equal(restoranmenuSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Restoranmenu instance if not signed in', function(done) {
		// Set Restoranmenu user 
		restoranmenu.user = user;

		// Create new Restoranmenu model instance
		var restoranmenuObj = new Restoranmenu(restoranmenu);

		// Save the Restoranmenu
		restoranmenuObj.save(function() {
			// Try deleting Restoranmenu
			request(app).delete('/restoranmenus/' + restoranmenuObj._id)
			.expect(401)
			.end(function(restoranmenuDeleteErr, restoranmenuDeleteRes) {
				// Set message assertion
				(restoranmenuDeleteRes.body.message).should.match('User is not logged in');

				// Handle Restoranmenu error error
				done(restoranmenuDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Restoranmenu.remove().exec();
		done();
	});
});