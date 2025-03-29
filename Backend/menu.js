const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure to import your database connection

// Merr te gjitha menut
router.get("/menu", (req, res) => {
  db.query("SELECT * FROM menu1", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(result);
  });
});

// Shto ushqim te ri ne menu
router.post("/menu", (req, res) => {
  const q = "INSERT INTO menu1 (`name`, `price`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Ushqimi është krijuar me sukses");
  });
});

// Fshi ushqim nga menu
router.delete("/menu/:id", (req, res) => {
  const ushqimiId = req.params.id;
  const q = "DELETE FROM menu1 WHERE id = ?";

  db.query(q, [ushqimiId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Ushqimi është fshirë me sukses");
  });
});

// Ndrysho te dhenat e ushqimit ne menu
router.put("/menu/:id", (req, res) => {
  const ushqimiId = req.params.id;
  const q = "UPDATE menu1 SET `name` = ?, `price` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.price,
  ];

  db.query(q, [...values, ushqimiId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Ushqimi është ndryshuar me sukses");
  });
});
router.get("/menu/:id", (req, res) => {
  const ushqimiId = req.params.id;
  const q = "SELECT * FROM menu1 WHERE id = ?";

  db.query(q, [ushqimiId], (err, result) => {
    if (err) {
      console.error("Error fetching food data:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(result[0]); // Send the first matching record
  });
});
module.exports = router;
