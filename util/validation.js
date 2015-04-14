var validator = require('validator');

var Menu = {
  validateGet: function(data) {
      return data.id !== undefined && validator.isInt(data.id);
  },
  validateInsert: function(data) {
    return  data.name !== undefined && data.name.length > 0 &&
            data.description !== undefined && data.description.length > 0 &&
            data.image !== undefined && validator.isURL(data.image) &&
            data.price !== undefined && validator.isFloat(data.price);
  },
  validateUpdate: function(data) {
      return  data.id !== undefined && validator.isInt(data.id) &&
              data.name !== undefined && data.name.length > 0 &&
              data.description !== undefined && data.description.length > 0 &&
              data.image !== undefined && validator.isURL(data.image) &&
              data.price !== undefined && validator.isFloat(data.price);
  },
  validateDelete: function(data) {
      return data.id !== undefined && validator.isInt(data.id);
  }
}


module.exports.Menu = Menu;
