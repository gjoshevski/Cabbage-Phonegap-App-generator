'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bcard = mongoose.model('Bcard'),
	_ = require('lodash');

/**
 * Create a Bcard
 */
exports.create = function(req, res) {
	var bcard = new Bcard(req.body);
	bcard.user = req.user;

	bcard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bcard);
		}
	});
};

/**
 * Show the current Bcard
 */
exports.read = function(req, res) {
	res.jsonp(req.bcard);
};

/**
 * Update a Bcard
 */
exports.update = function(req, res) {
	var bcard = req.bcard ;

	bcard = _.extend(bcard , req.body);

	bcard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bcard);
		}
	});
};

/**
 * Delete an Bcard
 */
exports.delete = function(req, res) {
	var bcard = req.bcard ;

	bcard.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bcard);
		}
	});
};

/**
 * List of Bcards
 */
exports.list = function(req, res) { 
	Bcard.find().sort('-created').populate('user', 'displayName').exec(function(err, bcards) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bcards);
		}
	});
};

/**
 * Bcard middleware
 */
exports.bcardByID = function(req, res, next, id) { 
	Bcard.findById(id).populate('user', 'displayName').exec(function(err, bcard) {
		if (err) return next(err);
		if (! bcard) return next(new Error('Failed to load Bcard ' + id));
		req.bcard = bcard ;
		next();
	});
};

/**
 * Bcard authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bcard.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
