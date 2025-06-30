const express = require('express');
const router = express.Router();
const db = require('./db'); // Rregullo path sipas vendndodhjes tënde

// POST /questions
router.post('/questions', (req, res) => {
 const { email, question } = req.body;

if (!email || !question) {
  return res.status(400).json({ error: 'Të gjitha fushat janë të detyrueshme' });
}

const sql = 'INSERT INTO user_questions (email, question) VALUES (?, ?)';
db.query(sql, [email, question], (err, result) => {
  if (err) {
    console.error('Gabim gjatë ruajtjes së pyetjes:', err);
    return res.status(500).json({ error: 'Gabim në server' });
  }
  res.status(200).json({ message: 'Pyetja u dërgua me sukses' });
});
});

router.get('/questions', (req, res) => {
  const sql = 'SELECT  * FROM user_questions';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Gabim gjatë marrjes së pyetjeve:', err);
      return res.status(500).json({ error: 'Gabim në server' });
    }
    res.json(results);
  });
});

// DELETE /questions/:id
router.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM user_questions WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë fshirjes së pyetjes:', err);
      return res.status(500).json({ error: 'Gabim në server' });
    }

    res.status(200).json({ message: 'Pyetja u fshi me sukses' });
  });
});

router.get('/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM user_questions';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Gabim në marrjen e numrit të feedback:', err);
      return res.status(500).json({ error: 'Gabim serveri' });
    }

    res.json({ count: results[0].count });
  });
});


module.exports = router;
