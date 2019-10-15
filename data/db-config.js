const knex = require('knex');

const config = require('../knexfile.js');

// for Deployment
// const dbEnvironment = process.env.DB_ENV || 'development';

// module.exports = knex(config[dbEnvironment]);

const db = knex(config.development);

module.exports = db;