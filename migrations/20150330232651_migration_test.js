'use strict';

exports.up = function(knex, Promise) {

  return knex.schema.createTable('companies', function(table){
  	table.increments('id');
  	table.string('name');
  	table.integer('timestamp');
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
