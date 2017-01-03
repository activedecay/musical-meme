/**
* comment schema (auto-generated)
*/
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: String,
  date: Date,
  text: String,
});

/*
// decompose a virtual value from the model into database schema fields
commentSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
commentSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
