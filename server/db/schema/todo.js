/**
* todo schema (auto-generated)
*/
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  project: Array,
  priority: Number,
  summary: String,
  description: String,
  spent: Number,
  estimate: Number,
  assignees: Array,
  reporters: Array,
  subtasks: Array,
  dates: {
    target: Array,
    due: Array,
    completed: Array,
  },
  comments: Array,
  attachments: Array,
  history: Array,
});

/*
// decompose a virtual value from the model into database schema fields
todoSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
todoSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const todo = mongoose.model('todo', todoSchema);
module.exports = todo;
