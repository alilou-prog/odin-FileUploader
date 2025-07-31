#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const DB_URL = process.env.DB_URL;

const reset_SQL = `
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS items;
`

const model_SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);
`
const seed_SQL = `
INSERT INTO categories (name) 
VALUES
    ('CS-industry'),
    ('CS-academy'),
    ('life');
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(reset_SQL);
  await client.query(model_SQL);
  await client.query(seed_SQL);
  await client.end();
  console.log("done");
}

main();
