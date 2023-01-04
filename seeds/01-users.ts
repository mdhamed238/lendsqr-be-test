import { Knex } from "knex";


// import seed data from sample data file
import { seed_data } from "../user.sample.data";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert(seed_data);
};
