const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure to import your database connection

// Merr oraret
router.get("/orari", (req, res) => {
  db.query("SELECT * FROM orari", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(result);
  });
});

// Shto orar te ri
router.post("/orari", (req, res) => {
  const q = "INSERT INTO orari(`name`, `role`, `h`, `m`, `me`, `e`, `p`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Orari është krijuar me sukses");
  });
});

// Fshi orar nga baza e te dhënave
router.delete("/orari/:id", (req, res) => {
  const orariId = req.params.id;
  const q = "DELETE FROM orari WHERE id = ?";

  db.query(q, [orariId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Orari është fshirë me sukses");
  });
});

// Ndrysho orarin
router.put("/orari/:id", (req, res) => {
  const orariId = req.params.id;
  const q = "UPDATE orari SET `name` = ?, `role` = ?, `h` = ?, `m` = ?, `me` = ?, `e` = ?, `p` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ];

  db.query(q, [...values, orariId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json("Orari është ndryshuar me sukses");
  });
});

module.exports = router;
