let environment = process.env.NODE_ENV || 'development';
let config = require('../../knexfile');
let envConfig = config[environment];
let knex = require('knex');
let connection = knex(envConfig);


export default connection;

