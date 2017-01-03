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
const book = mongoose.model('book', bookSchema);
module.exports = book;
