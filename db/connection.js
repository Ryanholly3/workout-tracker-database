// Set our environment
const environment = process.env.NODE_ENV || 'development';

// Use connection info from knexfile
const config = require('../knexfile');

// Coordinate the two above
const configEnv = config[environment];

// Bring in knex as a library
const knex = require('knex');

// Put it all together
const connection = knex(configEnv);

// Export so we can use it in our routes
module.exports = connection;
