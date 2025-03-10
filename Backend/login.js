const express = require('express');
const router = express.Router();
const db = require('./db'); 
const jwt = require('jsonwebtoken');

const secretKey = 'my_secret_key';

// Merr të gjithë përdoruesit
router.get("/v2/login", (req, res) => {
    db.query("SELECT * FROM login", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// Shto një përdorues të ri
router.post('/v1/login', (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const query = 'INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, role], (err, result) => {
        if (err) {
            console.error('Error during POST request:', err);
            return res.status(500).send('Error adding user');
        }
        res.status(201).json({ message: 'User added successfully' });
    });
});

// Përditëso një përdorues
router.put('/v1/login/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const query = 'UPDATE login SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
    db.query(query, [name, email, password, role, id], (err, result) => {
        if (err) {
            console.error('Error during PUT request:', err);
            return res.status(500).send('Error updating user');
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Fshi një përdorues
router.delete('/v1/login/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM login WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error during DELETE request:', err);
            return res.status(500).send('Error deleting user');
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Sign in
router.post('/v1/signin', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    const sql = "SELECT role FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
        if (data.length > 0) {
            const userRole = data[0].role;
            const payload = { email, role: userRole };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return res.json({ token, role: userRole, message: "Success" });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

// Register
router.post('/v1/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Error inserting data into the database" });
        }
        
        const payload = { name, email };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        
        return res.status(200).json({
            message: "User registered successfully",
            token,
        });
    });
});

module.exports = router;
