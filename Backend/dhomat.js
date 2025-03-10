const express = require('express');
const router = express.Router();

const db = require('./db'); 

// Merr të gjitha dhomat
router.get('/dhomat', (req, res) => {
    db.query('SELECT * FROM dhomat', (err, results) => {
        if (err) {
            console.error('Gabim gjatë marrjes së të dhënave:', err);
            return res.status(500).send('Gabim gjatë marrjes së të dhënave nga databaza');
        }
        res.json(results);
    });
});

// Shto një dhomë të re
router.post('/dhomat', (req, res) => {
    const { image, name, pershkrimi } = req.body;
    const query = 'INSERT INTO dhomat (image, name, pershkrimi) VALUES (?, ?, ?)';

    db.query(query, [image, name, pershkrimi], (err, results) => {
        if (err) {
            console.error('Gabim në shtimin e dhomës:', err);
            return res.status(500).send('Gabim në shtimin e dhomës');
        }
        res.status(201).json({ id: results.insertId, image, name, pershkrimi });
    });
});

// Përditëso një dhomë ekzistuese
router.put('/dhomat/:id', (req, res) => {
    const { id } = req.params;
    const { name, pershkrimi, image } = req.body;
    const sql = 'UPDATE dhomat SET name = ?, pershkrimi = ?, image = ? WHERE id = ?';
    const values = [name, pershkrimi, image, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Gabim gjatë përditësimit të dhomës:', err);
            return res.status(500).send('Gabim gjatë përditësimit të dhomës');
        }
        res.json(result);
    });
});

// Fshi një dhomë
router.delete('/dhomat/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM dhomat WHERE id = ?';
    
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Gabim gjatë fshirjes së dhomës:', err);
            return res.status(500).send('Gabim gjatë fshirjes së dhomës');
        }
        res.json(result);
    });
});

module.exports = router;
