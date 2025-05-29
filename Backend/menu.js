const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurimi multer për ruajtjen e imazheve në folderin /upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Prano vetëm imazhe
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// GET: Merr të gjitha ushqimet
router.get("/menu", (req, res) => {
  db.query("SELECT * FROM menu1", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(result);
  });
});

// POST: Shto ushqim të ri me imazh
router.post("/menu", upload.single('image'), (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const q = "INSERT INTO menu1 (`name`, `price`, `image`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.price, imagePath];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.json({ message: "Ushqimi është krijuar me sukses" });
  });
});

// DELETE: Fshi ushqimin dhe imazhin nga serveri
router.delete("/menu/:id", (req, res) => {
  const ushqimiId = req.params.id;

  // Së pari merr emrin e imazhit për fshirje nga disk
  db.query("SELECT image FROM menu1 WHERE id = ?", [ushqimiId], (err, results) => {
    if (err) {
      console.error('Error fetching image for deletion:', err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length > 0 && results[0].image) {
      const imagePath = path.join(__dirname, results[0].image);
      // Kontrollo nëse ekziston skedari dhe fshi
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Pastaj fshi rreshtin nga DB
    db.query("DELETE FROM menu1 WHERE id = ?", [ushqimiId], (err2, result2) => {
      if (err2) {
        console.error('Error deleting data:', err2);
        return res.status(500).send("Internal Server Error");
      }
      res.json({ message: "Ushqimi është fshirë me sukses" });
    });
  });
});

// PUT: Ndrysho të dhënat e ushqimit me opsionin e upload-it të imazhit të ri
router.put("/menu/:id", upload.single('image'), (req, res) => {
  const ushqimiId = req.params.id;

  // Së pari marrim të dhënat ekzistuese për imazhin
  db.query("SELECT image FROM menu1 WHERE id = ?", [ushqimiId], (err, results) => {
    if (err) {
      console.error('Error fetching existing image:', err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    let oldImage = results[0].image;
    let newImagePath = oldImage;

    // Nëse ka file të ri, fshi imazhin e vjetër nga disk dhe ruaj rrugën e re
    if (req.file) {
      newImagePath = `/uploads/${req.file.filename}`;
      if (oldImage) {
        const oldImagePath = path.join(__dirname, oldImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const q = "UPDATE menu1 SET `name` = ?, `price` = ?, `image` = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, newImagePath, ushqimiId];

    db.query(q, values, (err2, result2) => {
      if (err2) {
        console.error('Error updating data:', err2);
        return res.status(500).send("Internal Server Error");
      }
      res.json({ message: "Ushqimi është ndryshuar me sukses" });
    });
  });
});

// GET: Merr të dhënat e ushqimit për editim
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
    res.json(result[0]);
  });
});

module.exports = router;
