import * as dotenv from "dotenv";
dotenv.config();

// Update with your config settings.
const { DB_HOST,DB_PASSWORD, DB_PORT, DB_NAME, DB_USER } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    // connection: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
  },
};
