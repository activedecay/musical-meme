const logger = require('../logger');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbuser = process.env.DBUSER;
const dbpw = process.env.DBPW;
const url = `mongodb://${dbuser}:${dbpw}@ds151208.mlab.com:51208/effective-spoon`;
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

// api models
const model = {
  book: require('./schema/book'),
  spoon: require('./schema/spoon'),
};

module.exports = {
  find: (collection) => new Promise((res, rej) => {
    model[collection].find({}, (e, result) => e ? rej(e) : res(result));
  }),
  findOne: (collection, query, update) => new Promise((res, rej) => {
    model[collection].findOne(query, (e, result) => {
      logger.log('update', update, 'on', collection, 'where', query);
      Object.keys(update)
        .forEach((item) => {
          result[item] = update[item]; // eslint-disable-line no-param-reassign
        });
      result.save((err, saved) => e ? rej(e) : res(saved));
    });
  }),
};
