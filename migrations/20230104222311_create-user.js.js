/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create a table called "users" for a wallet money lender app
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.boolean("is_admin").defaultTo(false);
      table.float("balance").defaultTo(0);
      table.string("wallet_id");
      table.string("phone").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("transactions", (table) => {
      table.increments("id").primary();
      table.string("transaction_id").notNullable();
      table.string("transaction_type").notNullable();
      table.string("transaction_status").notNullable();
      table.float("amount").notNullable();
      table.string("sender_id");
      table.string("receiver_id");
      table.float("transaction_fee").notNullable();
      table.float("balance_before").notNullable().defaultTo(0);
      table.float("balance_after").notNullable().defaultTo(0);
      table.string("description");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("transactions");
};
