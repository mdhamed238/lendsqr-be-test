# Project Name: Demo Credit

## Description
This is a demo credit app that allows users to borrow money from a money lender. The money lender can also lend money to users.


#### Entity Relationship Diagram (ERD)
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdb995mgt4jx5cv9x62f.png)


---

##### Postman Documentation Link
_[Postman Documentation](https://documenter.getpostman.com/view/15544476/2s8Z73xW1j)_

---


##### Create your database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE lendsqr;
USE lendsqr;
```

#### Projec setup
```bash
yarn init -y && tsc --init
```

#### Dependencies used
```bash
yarn add express dotenv mysql2 knex cors compression helmet morgan express-rate-limit
```

#### How to run the project
> Make sure you have a .env file in the root directory of the project. Check the .env.example file for the required environment variables



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

---

### To fix roll back issues after editing the migration file
1. Get the file name of the migration file you want to rollback
```bash
ls -l migrations
```
2. Recreate the file in the migrations folder with the same name
3. Run the following command to rollback the migration. You can delete the tables first
```bash
knex migrate:rollback
```
4. Run the following command to run the migration again
```bash
knex migrate:latest
```

---

#### My API Endpoints

##### Register new user
POST ⇒ {{url}}api/v1/auth/signup
**Example requestbody:**
```js
{
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": true,
    "balance": 0,
    "wallet_id": 1,
    "phone": "08012345678",
    "email": "a@b.com",
}
```
**Example response body**
```js
{
    "success": true,
    "data": "User created successfully"
}
```

<br>


##### Login user
POST ⇒ {{URL}}api/v1/auth/login
**Example requestbody:**
```js
{
    "email": "yomi@b.com",
    "password": "admin1234"
}

```

**Example response body**
```js
{
   {
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b21pQGIuY29tIiwiaXNfYWRtaW4iOjAsImlhdCI6MTY3MjkxMzc1MH0.Dnj_sWZpOZxYk50xuEWYGFGrHKyAcPzmnPTqHCD_3Q4"
}
```
<br>

##### Fund your wallet
POST ⇒ {{URL}}api/v1/fund-wallet
Authorization: Bearer {{token}}
**Example requestbody:**
```js
{
    "amount":7000
}
```

**Example response body**
```js
{
    "success": true,
    "data": "Wallet funded successfully"
}
```

<br>

##### Transfer funds to another wallet
POST ⇒ {{URL}}api/v1/transfer-funds
Authorization: Bearer {{token}}
**Example requestbody:**
```js
{
    "amount": "70000",
    "wallet_id": "jyv2jtqe0"
}
```

**Example response body**
```js
{
    "success": true,
    "data": "Funds withdrawn successfully from your wallet"
}
```

<br>

##### View balance in your wallet
GET ⇒ {{URL}}api/v1/view-balance
Authorization: Bearer {{token}}

**Example response body**
```js
{
    "success": true,
    "data": "Your balance is 26638.92"
}
```

<br>

##### View transaction history
GET ⇒ {{URL}}api/v1/view-transaction-history
Authorization: Bearer {{token}}

**Example response body**
```js
{
    "success": true,
    "data": [
        {
            "id": 1,
            "amount": 7000,
            "wallet_id": "jyv2jtqe0",
            "transaction_type": "credit",
            "created_at": "2021-10-04T13:57:05.000Z",
            "updated_at": "2021-10-04T13:57:05.000Z"
        },
        {
            "id": 2,
            "amount": 70000,
            "wallet_id": "jyv2jtqe0",
            "transaction_type": "debit",
            "created_at": "2021-10-04T14:00:05.000Z",
            "updated_at": "2021-10-04T14:00:05.000Z"
        }
    ]
}
```

<br>

##### View transaction details
GET ⇒ {{URL}}api/v1/view-transaction-details/:transaction_id  
Authorization: Bearer {{token}}

**Example response body**
```js
{
    "success": true,
    "data": {
        "id": 1,
        "amount": 7000,
        "wallet_id": "jyv2jtqe0",
        "transaction_type": "credit",
        "created_at": "2021-10-04T13:57:05.000Z",
        "updated_at": "2021-10-04T13:57:05.000Z"
    }
}
```

<br>

##### View total amount of all transactions
GET ⇒ {{URL}}api/v1/total-amount
Authorization: Bearer {{token}}

**Example response body**
```js
{
    "success": true,
    "data": "Total amount of all transactions is 49497.030000000006"
}
```