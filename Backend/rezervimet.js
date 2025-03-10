const express = require('express');
const router = express.Router();
const db = require('./db');

// Merr dhomat standarte
router.get("/standarte", (req, res) => {
    db.query("SELECT * FROM standarte", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// Merr dhomat VIP
router.get("/vip", (req, res) => {
    db.query("SELECT * FROM vip", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// Merr dhomat ekskluzive
router.get("/ekskluzive", (req, res) => {
    db.query("SELECT * FROM ekslusive", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// Merr dhomat suite
router.get("/suite", (req, res) => {
    db.query("SELECT * FROM suite", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

// Merr dhomat familjare
router.get("/familjare", (req, res) => {
    db.query("SELECT * FROM familjare", (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

module.exports = router;
