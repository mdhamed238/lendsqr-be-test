import knex from "./src/db/knex";

(async () => {
    try {
        const resp = await knex.schema.alterTable('users', (table) => {
            table.string('phone').notNullable().unique();
        });

        console.log(resp);
    } catch (error) {
        console.error(error);
    }
}
)();

