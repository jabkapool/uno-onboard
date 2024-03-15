'use strict';
const { Pool } = require('pg');

const pool = new Pool({
    user: 'joaoeqs',
    password: 'qwert1234',
    host: 'localhost',
    database: 'uno-onboarding',
    port: 5432,
});

pool.on('error', (err, _) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.connect();

const myQuery = 'SELECT * FROM "Users"';
pool.query(myQuery, (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
        console.log(res.rows[1]);
    }
}); 
/*
const insMyQuery = 'INSERT INTO "Users" (name, age) VALUES(\'Joao\', 47)';
pool.query(insMyQuery, (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('User added with success');
    }
});
*/
pool.end();
