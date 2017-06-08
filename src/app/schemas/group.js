var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Group', groupSchema);
