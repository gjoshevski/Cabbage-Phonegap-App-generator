var knex = require('knex')(require('../../knexfile').development);
var bookshelf = require('bookshelf')(knex);

var Menu = bookshelf.Model.extend({
	tableName: 'menu'
});

module.exports.Menu = Menu;