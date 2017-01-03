/**
* spoon schema (auto-generated)
*/
const mongoose = require('mongoose');

const spoonSchema = new mongoose.Schema({
  tits: String,
  ass: Number,
});
const spoon = mongoose.model('spoon', spoonSchema);
module.exports = spoon;
