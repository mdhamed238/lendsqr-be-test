import mysql from 'mysql2';
import knex from "../src/db/knex";
import app from '../src/app';
import bcyrpt from "bcryptjs";


import request from 'supertest';
import { expect } from 'chai';
import e from 'express';

let token: any = null;
describe('database tests', () => {
    before((done) => {


        // Connect to the database
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Bassguitar1'
        });

        // Drop the database if it exists
        connection.query('DROP DATABASE IF EXISTS lendsqr_test', (err) => {
            if (err) throw err;
            // Create the database
            connection.query('CREATE DATABASE lendsqr_test', (err) => {
                if (err) throw err;
                connection.end((err) => {
                    if (err) throw err;
                    knex.migrate.latest()
                        .then(() => {
                            return knex.seed.run()
                        })
                        .then(() => {
                            done();
                        });
                });
            });
        });

    });

    // HEALTH CHECK
    it("HEALTH CHECK", (done) => {
        request(app)
            .get('/api/v1')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({ message: 'Welcome to Lendsqr API' }, done);
    })

    // REGISTER a new user
    it("REGISTER a new user", (done) => {

        request(app)
            .post('/api/v1/register')
            .set("Accept", "application/json")
            .send({
                "email": "ab@gmail.com",
                "password": "12345678",
                "first_name": "aby",
                "last_name": "oguns",
                "phone": "08167236712"
            })
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((res) => {
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data', 'User created successfully');
                expect(res.body).to.have.property('statusCode', 201);
            })
            .end(done);
    });

    // LOGIN a user
    it("LOGIN a user", (done) => {
        request(app)
            .post('/api/v1/login')
            .set("Accept", "application/json")
            .send({
                "email": "ab@gmail.com",
                "password": "12345678"
            })
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).have.property("statusCode", 200);
                expect(res.body).have.property("success", true);
                expect(res.body).have.property("data");
                token = res.body.data;
                console.log({ "===========": res.body.data });
            })
            .end(done)

    });

    // Fund a wallet
    it("Fund a wallet", (done) => {

        request(app)
            .post('/api/v1/fund-wallet')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`) // this is the token generated from the login route
            .send({
                "amount": 1000,
            })
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).have.property("success", true);
                expect(res.body).have.property("data", "Wallet funded successfully");
            }).end(done);

    });

    // Transfer funds
    it("Transfer funds", (done) => {
        request(app)
            .post('/api/v1/transfer-funds')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`) // this is the token generated from the login route
            .send({
                "amount": 4,
                "wallet_id": "345679"
            })
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).have.property("success", true);
                expect(res.body).have.property("data");
            }).end(done);

    });



});