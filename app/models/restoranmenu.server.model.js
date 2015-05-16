'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Restoranmenu Schema
 */
var RestoranmenuSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Restoranmenu name',
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

mongoose.model('Restoranmenu', RestoranmenuSchema);