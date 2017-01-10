/* eslint consistent-return:0 */
const express = require('express');
const logger = require('./logger');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const bodyParser = require('body-parser');

const db = require('./db/db');

app.use(bodyParser.json()); // allows express to parse application/json
app.get('/api/:collection', (req, res) => {
  db.readAll(req.params.collection)
    .then((col) => res.json(col));
});

app.post('/api/:collection/:item', (req, res) => {
  const { collection, item } = req.params;
  logger.log('post', collection, '==', item, JSON.stringify(req.body));
  if (!req.body.query || !req.body.update) {
    res.status(412).json({ error: 'body requires .query and .update' });
    return;
  }
  const { query, update } = req.body;
  db.readOne(collection, req.body.query)
  //  todo update existing
  //   // .then(x => {
  //   //   if (update)
  //   //     return db.update(collection, query, update)
  //   //       .then(x => res.json(x),
  //   //         e => res.status(e.code).json(e.e));
  //   //   return Promise.resolve(x);
  //   // })
    .then(x => res.json(x),
      e => res.status(e.code).json(e.e))
})

app.post('/api/:collection', (req, res) => {
  logger.log('post', req.body);
  if (!req.body.create) {
    res.status(412).json({ error: 'body requires .create' });
    return;
  }
  db.create(req.params.collection, req.body.create)
    .then(x => res.json(x),
      e => res.status(e.code).json(e.e));
});

app.put('/api/:collection', (req, res) => {
  logger.log('put', JSON.stringify(req.body));
  if (!req.body.query || !req.body.update) {
    res.status(412).json({ error: 'body requires .query and .update' });
    return;
  }
  db.update(req.params.collection, req.body.query, req.body.update)
    .then(x => res.json(x),
      e => res.status(e.code).json(e.e));
});

app.delete('/api/:collection', (req, res) => {
  logger.log('delete', req.body);
  if (!req.body.delete) {
    res.status(412).json({ error: 'body requires .create' });
    return;
  }
  db.delete(req.params.collection, req.body.delete)
    .then(x => res.json(x));
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
