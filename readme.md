##### Create your database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE lendsqr;
USE lendsqr;
```

#### ERD for the database
![ERD](
    )


---

#### Install depenedencies
```bash
yarn add mysql2 knex
```

#### Create a knexfile.js
```bash
knex init
```

Then edit the file to look like this:
```js
module.exports = {
  development: {
   client: 'mysql2',
    connection: `mysql://root:${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    }}
```

#### Create a migration
```bash
knex migrate:make create-user
```

The above command will create a file in the migrations folder.

---


Open the file inside the migrations folder and edit it to look like this:
```js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    // Create a table called "users" for a wallet money lender app
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.boolean("is_admin").defaultTo(false);
        table.float("balance").defaultTo(0);
        table.walletId("wallet_id");
        table.string("phone").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
    );
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
  
};

```

#### Run the migration
```bash
knex migrate:latest
```
Output:
```bash
Using environment: development
Batch 1 run: 1 migrations
```

#### Check the database and see if the table was created
```bash
mysql -u root -p
```

```sql
USE lendsqr;
SHOW TABLES;
```

---

#### Seed table with sample data
```bash
knex seed:make 01-users
```

This will create a file in the seeds folder called 01-users.ts

Next create a file called user.sample.data.ts in the seeds folder and add array of objects to it like this:
```js
export const users = [
    {
        first_name: "John",
        last_name: "Doe",
        is_admin: true,
        balance: 0,
        wallet_id: 1,
        phone: "08012345678",
        email: "a@b.com"
    },
    {
        first_name: "Jane",
        last_name: "Doe",
        is_admin: false,
        balance: 0,
        wallet_id: 2,
        phone: "08012345678",
        email: "b@b.com"
    }
];

```

Then import the array into the 01-users.ts file and add the following code to it.

Then run the seed command
```bash
knex seed:run
```

Verify that the data was added to the table by running the following command:
```bash
select * from users;
```


