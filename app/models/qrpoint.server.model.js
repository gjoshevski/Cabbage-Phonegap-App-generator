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
	appId: {
		type: String,
		default: '',
		required: 'Please fill AppId',
		trim: true
	},
	userImei: {
		type: String,
		default: '',
		required: 'Please fill user Imei',
		trim: true
	},
	additionalInfo: {
		type: String,
		default: '',		
		trim: true
	},
	points: {
		type: Number,
		default: 0		
	}
});

mongoose.model('Qrpoint', QrpointSchema);