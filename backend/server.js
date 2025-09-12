const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ success: false, message: 'Please enter username and password.' });
    }
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error.' });
        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid credentials.' });
        }
    });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password, email, age, birthdate } = req.body;
    if (!username || !password || !email || !age || !birthdate) {
        return res.json({ success: false, message: 'Please fill all fields.' });
    }
    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error.' });
        if (results.length > 0) {
            return res.json({ success: false, message: 'Username or email already exists.' });
        }
        // Insert new user with age and birthdate
        const insertQuery = 'INSERT INTO users (username, password, email, age, birthdate) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [username, password, email, age, birthdate], (err, result) => {
            if (err) return res.json({ success: false, message: 'Database error.' });
            res.json({ success: true, message: 'Signup successful! Please login.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
