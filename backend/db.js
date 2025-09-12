const mysql = require('mysql');

const db = mysql.createConnection({
       host: 'localhost',
       user: 'root', // change to your MySQL username
       password: 'sadi9870', // change to your MySQL password
       database: 'furniro_database', // updated to your new database name
       port: 3306 // default MySQL port
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;
