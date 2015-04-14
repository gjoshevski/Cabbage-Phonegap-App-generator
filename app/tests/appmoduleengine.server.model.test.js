'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Appmoduleengine = mongoose.model('Appmoduleengine');

/**
 * Globals
 */
var user, appmoduleengine;

/**
 * Unit tests
 */
describe('Appmoduleengine Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			appmoduleengine = new Appmoduleengine({
				name: 'Appmoduleengine Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return appmoduleengine.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			appmoduleengine.name = '';

			return appmoduleengine.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Appmoduleengine.remove().exec();
		User.remove().exec();

		done();
	});
});