/**
* spoon schema (auto-generated)
*/
const mongoose = require('mongoose');

const spoonSchema = new mongoose.Schema({
  tits: String,
  ass: Number,
});

/*
// decompose a virtual value from the model into database schema fields
spoonSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
spoonSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const spoon = mongoose.model('spoon', spoonSchema);
module.exports = spoon;
