/**
* book schema (auto-generated)
*/
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  year: Number,
  author: String,
  bookmarks: Array,
  published: Date,
  score: {
    wins: Number,
    losses: Number,
    assists: {
      names: Array,
    },
  },
});

/*
// decompose a virtual value from the model into database schema fields
bookSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
bookSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const book = mongoose.model('book', bookSchema);
module.exports = book;
