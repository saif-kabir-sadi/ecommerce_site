const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // change to your MySQL username
    password: '', // change to your MySQL password
    database: 'furniro_db' // change to your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;
