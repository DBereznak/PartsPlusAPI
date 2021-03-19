var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartSchema = new Schema({
  name: String,
  partNumber: String,
  description: String,
  quantity: Number,
  unitPrice: Number,
  resellPrice: Number,
});

module.exports = mongoose.model("Part", PartSchema);
