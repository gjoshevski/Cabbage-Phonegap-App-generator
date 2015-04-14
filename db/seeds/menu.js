'use strict';

exports.seed = function(knex, Promise) {
	return Promise.join(
		// Deletes ALL existing entries
		knex('menu').del(), 

		// Inserts seed entries
		knex('menu').insert({name: "Lasko", description: "The best beer in the world", image: "http://www.lasko.eu/images/lasko_zlatorog_new.png", price: 2.3 }),
		knex('menu').insert({name: "Bread", description: "It's bread, what do you want", image: "http://ichef.bbci.co.uk/food/ic/food_16x9_608/recipes/paul_hollywoods_crusty_83536_16x9.jpg", price: 0.9 }),
		knex('menu').insert({name: "Nutela", description: "Sweet, sweet enjoyment", image: "http://www.nutella.be/image/journal/article?img_id=903991&t=1373978105638", price: 5.2 })
	);
};