/**
 * Component Generator
 */

// todo g = require generate-schema; g.mongoose(Object object) OR maybe github.com/keystonejs/keystone

const fs = require('fs');
const path = require('path');
const schemaExists = require('../utils/schemaExists');
const sources = fs.readdirSync('server/db/src');
const _ = require('lodash');

const prepareObject = (o) =>
  _.reduce(o, (a, v, k) => {
    if (_.isObject(v)) {
      if (_.isArray(v)) {
        return a.concat({ key: k, val: 'array' });
      } else if (v instanceof Date) {
        return a.concat({ key: k, val: 'date' });
      }
      return a.concat({ key: k, obj: prepareObject(v) });
    }
    return a.concat({ key: k, val: typeof v });
  }, []);

module.exports = {
  description: 'A mongoose schema',
  prompts: [{
    type: 'list',
    name: 'source', // data.source
    message: 'Select the source document',
    choices: () => sources.map(s => ({
      name: s, // display name in schema generator prompts
      value: {
        filename: s, // data.source.filename inside { actions: (data) => ... }
        name: s.replace(path.extname(s), ''), // data.source.name inside { actions: (data) => ... }
        schema: prepareObject(require(`../../../server/db/src/${s}`)), // eslint-disable-line
      },
    })),
    validate: value => // value from prompt choice chosen
      schemaExists(`${value.name}`) ? 'A schema with this name already exists' : true,
  }],
  actions: () => [{
    type: 'add',
    path: '../../server/db/schema/{{source.filename}}',
    templateFile: './schema/schema.hbs',
    abortOnFail: true,
  }],
};
