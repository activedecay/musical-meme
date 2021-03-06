/**
* board schema (auto-generated)
*/
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  admins: Array,
  users: Array,
  projects: Array,
  lists: Array,
});

/*
// decompose a virtual value from the model into database schema fields
boardSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
boardSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const board = mongoose.model('board', boardSchema);
module.exports = board;
