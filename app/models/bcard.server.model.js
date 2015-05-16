'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bcard Schema
 */
var BcardSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bcard name',
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

mongoose.model('Bcard', BcardSchema);