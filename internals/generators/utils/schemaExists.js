/**
 * schemaExists
 *
 * Check whether the schema exists
 */

const fs = require('fs');
const schemas = fs.readdirSync('server/db/schema');

function schemaExists(comp) {
  return schemas.indexOf(comp) >= 0;
}

module.exports = schemaExists;
