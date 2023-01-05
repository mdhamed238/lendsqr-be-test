import logger from "../log/logger";

let environment = process.env.NODE_ENV || 'development';
let config = require('../../knexfile');
let envConfig = config[environment];
let knex = require('knex');
let connection = knex(envConfig);


// log connected to database on console
connection.raw('select 1+1 as result').then(() => {
    logger.info('Connected to database');
});

export default connection;

