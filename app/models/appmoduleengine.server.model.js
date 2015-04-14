'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Appmoduleengine Schema
 */
var AppmoduleengineSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Appmoduleengine name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Appmoduleengine', AppmoduleengineSchema);