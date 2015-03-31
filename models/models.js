var knex = require('knex')(require('../knexfile').development);
var bookshelf = require('bookshelf')(knex);

var Company = bookshelf.Model.extend({
	tableName: 'companies'
});

module.exports.Company = Company;