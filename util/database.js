const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complet',
    password: 'Skews2728'
});

module.exports = pool.promise();
