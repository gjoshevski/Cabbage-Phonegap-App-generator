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
	address: {
		type: String,
		default: '',
		required: 'Please fill Bcard adress',
		trim: true
	},
	number: {
		type: String,
		default: '',
		required: 'Please fill Bcard number',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please fill Bcard image',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Bcard email',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	appId: {
		type: String,
		default: '',
		required: 'Please fill Bcard appId',
		trim: true
	}
});

mongoose.model('Bcard', BcardSchema);