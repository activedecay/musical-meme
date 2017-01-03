/**
* user schema (auto-generated)
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  boards: Array,
});

/*
// decompose a virtual value from the model into database schema fields
userSchema.virtual('prop.path.here').set(val => {
  this.first = val.split(' ')[0];
  this.last = val.split(' ')[1];
});
// compose a virtual value from the model instance and store as a field
userSchema.virtual('prop.path.here').get(() => {
  return `${this.first} ${this.last}`; // a full name virtual property
});
*/

const user = mongoose.model('user', userSchema);
module.exports = user;
