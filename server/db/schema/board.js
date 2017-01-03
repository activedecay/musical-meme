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
const board = mongoose.model('board', boardSchema);
module.exports = board;
