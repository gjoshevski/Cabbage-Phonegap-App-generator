'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Qrpoint = mongoose.model('Qrpoint');

/**
 * Globals
 */
var user, qrpoint;

/**
 * Unit tests
 */
describe('Qrpoint Model Unit Tests:', function() {
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
			qrpoint = new Qrpoint({
				name: 'Qrpoint Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return qrpoint.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			qrpoint.name = '';

			return qrpoint.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Qrpoint.remove().exec();
		User.remove().exec();

		done();
	});
});