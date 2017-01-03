/**
* project schema (auto-generated)
*/
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  color: String,
});

/*
// decompose a virtual value from the model into database schema fields
projectSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
projectSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const project = mongoose.model('project', projectSchema);
module.exports = project;
