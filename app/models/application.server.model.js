'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Application Schema
 */
var ApplicationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},
	modules: {
		type: Array,
		default: []
	},
	created: { 
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	admin: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Application', ApplicationSchema);