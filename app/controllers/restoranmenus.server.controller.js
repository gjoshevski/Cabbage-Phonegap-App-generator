'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Restoranmenu = mongoose.model('Restoranmenu'),
	_ = require('lodash');

/**
 * Create a Restoranmenu
 */
exports.create = function(req, res) {
	var restoranmenu = new Restoranmenu(req.body);
	restoranmenu.user = req.user;

	restoranmenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restoranmenu);
		}
	});
};

/**
 * Show the current Restoranmenu
 */
exports.read = function(req, res) {
	res.jsonp(req.restoranmenu);
};

/**
 * Update a Restoranmenu
 */
exports.update = function(req, res) {
	var restoranmenu = req.restoranmenu ;

	restoranmenu = _.extend(restoranmenu , req.body);

	restoranmenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restoranmenu);
		}
	});
};

/**
 * Delete an Restoranmenu
 */
exports.delete = function(req, res) {
	var restoranmenu = req.restoranmenu ;

	restoranmenu.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restoranmenu);
		}
	});
};

/**
 * List of Restoranmenus
 */
exports.list = function(req, res) { 
	var appId = req.params.appId;	

	Restoranmenu.find({ 'appId': appId }).sort('-created').populate('user', 'displayName').exec(function(err, restoranmenus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restoranmenus);
		}
	});
};

/**
 * Restoranmenu middleware
 */
exports.restoranmenuByID = function(req, res, next, id) { 
	Restoranmenu.findById(id).populate('user', 'displayName').exec(function(err, restoranmenu) {
		if (err) return next(err);
		if (! restoranmenu) return next(new Error('Failed to load Restoranmenu ' + id));
		req.restoranmenu = restoranmenu ;
		next();
	});
};

/**
 * Restoranmenu authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.restoranmenu.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
