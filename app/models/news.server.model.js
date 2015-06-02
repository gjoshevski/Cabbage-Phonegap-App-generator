'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * News Schema
 */
var NewsSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill News title',
		trim: true
	},
	additionalInfo: {
		type: String,
		default: '',		
		trim: true
	},
	imageUrl: {
		type: String,
		default: '',		
		trim: true
	},
	newsUrl: {
		type: String,
		default: '',		
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	appId: {
		type: String,
		default: '',
		required: 'Please fill AppId',
		trim: true
	},
});

mongoose.model('News', NewsSchema);