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
	nameOfItem: {
		type: String,
		default: '',
		required: 'Please fill Item name',
		trim: true
	},
	descriptionOfItem: {
		type: String,
		default: '',
		required: 'Please fill description',
		trim: true
	},
	imageUrl: {
		type: String,
		default: '',		
		trim: true
	},
	appId: {
		type: String,
		default: '',
		required: 'Please fill App id name',
		trim: true
	},
	priceInEuroCents: {
		type: Number,
		default: 0		
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Restoranmenu', RestoranmenuSchema);