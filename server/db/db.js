const logger = require('../logger');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbuser = process.env.DBUSER;
const dbpw = process.env.DBPW;
const url = `mongodb://${dbuser}:${dbpw}@ds151208.mlab.com:51208/effective-spoon`;
mongoose.connect(url);
const _ = require('lodash');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  // we're connected!
});

// api models
const model = {};
model.board = require('./schema/board');
model.book = require('./schema/book');
model.comment = require('./schema/comment');
model.list = require('./schema/list');
model.project = require('./schema/project');
model.spoon = require('./schema/spoon');
model.todo = require('./schema/todo');
model.user = require('./schema/user');

module.exports = {
  create: (collection, create) => new Promise((res, rej) => {
    model[collection].find(create, (findError, result) => {
      logger.log('find', findError, 'result', result, 'create', create);
      findError ? rej({ code: 500, e: {error: findError} }) :
        !_.isEmpty(result) ? rej({ code: 412, e: {error: 'exists'} }) :
          model[collection].create(create, (createError, result) =>
            createError ? rej({ code: 500, e: createError }) : res(result));
    });
  }),
  readAll: (collection) => new Promise((res, rej) => {
    model[collection].find({}, (e, result) =>
      e ? rej(e) : res(result));
  }),
  readOne: (collection, query) => new Promise((res, rej) => {
    model[collection].findOne(query, (e, result) => {
      e ? rej({code: 500, e: e}) :
        result ? res(result) : rej({code: 404, e: {error: `${collection} not found`}});
    });
  }),
  update: (collection, query, update) => new Promise((res, rej) => {
    model[collection].findOne(query, (e, result) => {
      logger.log('update', update, 'on', collection, 'where', query);
      Object.keys(update)
        .forEach((item) => {
          result[item] = update[item]; // eslint-disable-line no-param-reassign
        });
      result.save((err, saved) =>
        err ? rej({ code: 500, e: err }) : res(saved));
    });
  }),
  delete: (collection, query) => new Promise((res, rej) => {
    model[collection].remove(query, (e) => e ? rej(e) : res({ retval: 0 }));
  }),
};
