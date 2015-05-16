'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Qrpoint = mongoose.model('Qrpoint'),
	_ = require('lodash');

/**
 * Create a Qrpoint
 */
exports.create = function(req, res) {
	var qrpoint = new Qrpoint(req.body);
	qrpoint.user = req.user;

	qrpoint.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrpoint);
		}
	});
};

/**
 * Show the current Qrpoint
 */
exports.read = function(req, res) {
	res.jsonp(req.qrpoint);
};

/**
 * Update a Qrpoint
 */
exports.update = function(req, res) {
	var qrpoint = req.qrpoint ;

	qrpoint = _.extend(qrpoint , req.body);

	qrpoint.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrpoint);
		}
	});
};

/**
 * Delete an Qrpoint
 */
exports.delete = function(req, res) {
	var qrpoint = req.qrpoint ;

	qrpoint.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrpoint);
		}
	});
};

/**
 * List of Qrpoints
 */
exports.list = function(req, res) { 
	Qrpoint.find().sort('-created').populate('user', 'displayName').exec(function(err, qrpoints) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrpoints);
		}
	});
};

/**
 * Qrpoint middleware
 */
exports.qrpointByID = function(req, res, next, id) { 
	Qrpoint.findById(id).populate('user', 'displayName').exec(function(err, qrpoint) {
		if (err) return next(err);
		if (! qrpoint) return next(new Error('Failed to load Qrpoint ' + id));
		req.qrpoint = qrpoint ;
		next();
	});
};

/**
 * Qrpoint authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.qrpoint.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
