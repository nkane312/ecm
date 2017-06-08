var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
  name: String,
  utm: String,
  country: String,
  templates: Array
});

module.exports = mongoose.model('Campaign', campaignSchema);
