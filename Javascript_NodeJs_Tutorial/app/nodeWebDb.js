const pg = require('pg');
const { Pool } = require('pg');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');

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


app.get('/users', (request, response, next) => {  
    if(!pool.connect()) {
        console.log('Connection failed');
        return;
    }
    pool.query('SELECT * FROM "Users"', (error, result) => {
        if (error) return next(error);
        response.json(result.rows);
    });

});

app.listen(3000);
