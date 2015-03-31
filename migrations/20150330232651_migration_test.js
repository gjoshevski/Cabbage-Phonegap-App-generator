'use strict';

exports.up = function(knex, Promise) {

  return knex.schema.createTable('menu', function(table){
  	table.increments('id');
  	table.string('name');
  	table.string('description');
  	table.string('image');
  	table.float('price');
  	table.timestamps();
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu');
};
