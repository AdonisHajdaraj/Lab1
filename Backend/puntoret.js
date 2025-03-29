const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure to import your database connection

// Merr te gjitha puntoret
router.get("/puntoret", (req, res) => {
  db.query("SELECT * FROM puntoret", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(result);
  });
});

// Shto puntor te ri
router.post("/puntoret", (req, res) => {
  const q = "INSERT INTO puntoret (`name`, `sname`, `role`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.sname,
    req.body.role,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Puntori është krijuar me sukses");
  });
});

// Fshi puntor nga ID
router.delete("/puntoret/:id", (req, res) => {
  const puntoriId = req.params.id;
  const q = "DELETE FROM puntoret WHERE id = ?";

  db.query(q, [puntoriId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Puntori është fshirë me sukses");
  });
});

// Ndrysho te dhenat e puntorit
router.put("/puntoret/:id", (req, res) => {
  const puntoriId = req.params.id;
  const q = "UPDATE puntoret SET `name` = ?, `sname` = ?, `role` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.sname,
    req.body.role,
  ];

  db.query(q, [...values, puntoriId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Puntori është ndryshuar me sukses");
  });
});
router.get("/puntoret/:id", (req, res) => {
  const puntoriId = req.params.id;
  const q = "SELECT * FROM puntoret WHERE id = ?";

  db.query(q, [puntoriId], (err, result) => {
    if (err) {
      console.error("Error fetching worker data:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(result[0]); // Send the first matching record
  });
}); 
module.exports = router;
