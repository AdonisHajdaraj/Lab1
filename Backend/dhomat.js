const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Krijo folderin 'uploads' nëse nuk ekziston
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Config multer për upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// GET /dhomat (shfaq të gjitha dhomat)
router.get('/', (req, res) => {
  db.query('SELECT * FROM dhomat', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST /dhomat (shto dhomë me imazh)
router.post('/', upload.single('image'), (req, res) => {
  const { name, pershkrimi } = req.body;
  const image = req.file ? `http://localhost:3008/uploads/${req.file.filename}` : '';
  db.query(
    'INSERT INTO dhomat (name, pershkrimi, image) VALUES (?, ?, ?)',
    [name, pershkrimi, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, pershkrimi, image });
    }
  );
});

// PUT /dhomat/:id (përditëso dhomë)
router.put('/:id', upload.single('image'), (req, res) => {
  const { name, pershkrimi } = req.body;
  const id = req.params.id;

  let sql = 'UPDATE dhomat SET name=?, pershkrimi=?';
  const params = [name, pershkrimi];

  if (req.file) {
    sql += ', image=?';
    params.push(`http://localhost:3008/uploads/${req.file.filename}`);
  }

  sql += ' WHERE id=?';
  params.push(id);

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, pershkrimi, image: req.file ? `http://localhost:3008/uploads/${req.file.filename}` : null });
  });
});

// DELETE /dhomat/:id (fshi dhomë)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM dhomat WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(204);
  });
});

module.exports = router;
