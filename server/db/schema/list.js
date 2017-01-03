/**
* list schema (auto-generated)
*/
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: String,
  todos: Array,
});

/*
// decompose a virtual value from the model into database schema fields
listSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
listSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const list = mongoose.model('list', listSchema);
module.exports = list;
