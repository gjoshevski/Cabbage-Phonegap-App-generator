'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Qrpoint Schema
 */
var QrpointSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Qrpoint name',
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

mongoose.model('Qrpoint', QrpointSchema);