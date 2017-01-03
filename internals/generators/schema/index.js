/**
 * Component Generator
 */

// todo g = require generate-schema; g.mongoose(Object object)

const fs = require('fs');
const path = require('path');
const schemaExists = require('../utils/schemaExists');
const sources = fs.readdirSync('server/db/src');
const nameSuggestions = sources.map((n) => n.replace(path.extname(n), ''));
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
    name: 'source',
    message: 'Select the source document',
    choices: () => sources.map(s => ({
      name: s,
      value: prepareObject(require(`../../../server/db/src/${s}`)),
    })),
  }, {
    type: 'list',
    name: 'name',
    message: 'What should it be called?',
    choices: () => nameSuggestions,
    validate: value => schemaExists(`${value}.js`) ? 'A schema with this name already exists' : true,
  }],
  actions: (data) => {
    console.info(data);
    return [{
      type: 'add',
      path: '../../server/db/schema/{{name}}.js',
      templateFile: './schema/schema.hbs',
      abortOnFail: true,
    }];
  },
};
