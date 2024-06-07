import pg from 'pg';
import process from 'process';
const { Client } = pg;
export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_URL,
    port: 5439,
    database: 'test4',
});
export default client;
