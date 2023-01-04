
import knex from "knex";
// create array of sample data using typescript
export const seed_data =
    [{
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "a@gmail.com",
        password: "123456",
        phone: "1234567890",
        balance: 1000,
        is_admin: false,
        wallet_id: 345678,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        first_name: "Smith",
        last_name: "Doe",
        email: "smith@gmail.com",
        password: "12345678",
        phone: "1234567891",
        balance: 2000,
        is_admin: false,
        wallet_id: 345679,
        created_at: new Date(),
        updated_at: new Date(),
    }]
    ;

