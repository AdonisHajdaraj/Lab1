const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure to import your database connection

// Merr dhomat sipas llojit
router.get('/rooms/:type', (req, res) => {
  const { type } = req.params;

  const query = 'SELECT * FROM reservations WHERE name = ?';

  db.query(query, [type], (err, rooms) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching rooms');
    }

    res.json(rooms);  
  });
});

// Rezervo dhome
router.post('/reserve', (req, res) => {
  const { roomId, from_date, to_date } = req.body;

  if (!roomId || !from_date || !to_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    UPDATE reservations
    SET reservation_status = '1', from_date = ?, to_date = ?
    WHERE id = ?
  `;

  db.query(query, [from_date, to_date, roomId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Room not found or already reserved' });
    }

    res.json({ message: 'Room reserved successfully!' });
  });
});

// Merr te gjitha rezervimet (admin)
router.get('/admin/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching reservations' });
    }

    res.json(results);
  });
});

// Anulo rezervimin
router.post('/cancel', (req, res) => {
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  const sql = `
    UPDATE reservations 
    SET reservation_status = '0', from_date = NULL, to_date = NULL 
    WHERE id = ? AND reservation_status = '1'
  `;

  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to cancel the reservation' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or already available' });
    }

    res.status(200).json({ message: 'Reservation canceled successfully' });
  });
});

module.exports = router;
