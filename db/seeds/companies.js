'use strict';

exports.seed = function(knex, Promise) {
	return Promise.join(
		// Deletes ALL existing entries
		knex('companies').del(), 

		// Inserts seed entries
		knex('companies').insert({id: 1, name: 'Microsoft', timestamp: 1}),
		knex('companies').insert({id: 2, name: 'Google', timestamp: 3}),
		knex('companies').insert({id: 3, name: 'Biokoda', timestamp: 1})
	);
};