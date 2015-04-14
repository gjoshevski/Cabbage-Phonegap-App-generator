'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Appmoduleengine = mongoose.model('Appmoduleengine'),
	_ = require('lodash');

/**
 * Create a Appmoduleengine
 */
exports.create = function(req, res) {
	var appmoduleengine = new Appmoduleengine(req.body);
	appmoduleengine.user = req.user;

	appmoduleengine.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appmoduleengine);
		}
	});
};

/**
 * Show the current Appmoduleengine
 */
exports.read = function(req, res) {
	res.jsonp(req.appmoduleengine);
};

/**
 * Update a Appmoduleengine
 */
exports.update = function(req, res) {
	var appmoduleengine = req.appmoduleengine ;

	appmoduleengine = _.extend(appmoduleengine , req.body);

	appmoduleengine.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appmoduleengine);
		}
	});
};

/**
 * Delete an Appmoduleengine
 */
exports.delete = function(req, res) {
	var appmoduleengine = req.appmoduleengine ;

	appmoduleengine.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appmoduleengine);
		}
	});
};

/**
 * List of Appmoduleengines
 */
exports.list = function(req, res) { 
	Appmoduleengine.find().sort('-created').populate('user', 'displayName').exec(function(err, appmoduleengines) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appmoduleengines);
		}
	});
};

/**
 * Appmoduleengine middleware
 */
exports.appmoduleengineByID = function(req, res, next, id) { 
	Appmoduleengine.findById(id).populate('user', 'displayName').exec(function(err, appmoduleengine) {
		if (err) return next(err);
		if (! appmoduleengine) return next(new Error('Failed to load Appmoduleengine ' + id));
		req.appmoduleengine = appmoduleengine ;
		next();
	});
};

/**
 * Appmoduleengine authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.appmoduleengine.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
