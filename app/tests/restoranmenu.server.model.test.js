'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Restoranmenu = mongoose.model('Restoranmenu');

/**
 * Globals
 */
var user, restoranmenu;

/**
 * Unit tests
 */
describe('Restoranmenu Model Unit Tests:', function() {
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
			restoranmenu = new Restoranmenu({
				name: 'Restoranmenu Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return restoranmenu.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			restoranmenu.name = '';

			return restoranmenu.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Restoranmenu.remove().exec();
		User.remove().exec();

		done();
	});
});