const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure to import your database connection

// Get rooms by type
router.get('/rooms/:type', (req, res) => {
  const { type } = req.params;

  const query = 'SELECT * FROM rooms WHERE type = ?';

  db.query(query, [type], (err, rooms) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Gabim gjatë marrjes së dhomave' });
      }
      res.json(rooms);
  });
});

// Reserve a room
router.post('/reserve', (req, res) => {
  const { user_id, room_id, from_date, to_date } = req.body;

  if (!user_id || !room_id || !from_date || !to_date) {
      return res.status(400).json({ error: 'Të gjitha fushat janë të detyrueshme' });
  }

  // Check if the room is available
  const checkQuery = `SELECT reservation_status FROM rooms WHERE id = ?`;

  db.query(checkQuery, [room_id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Gabim në verifikimin e dhomës' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'Dhoma nuk u gjet' });
      }

      if (results[0].reservation_status === '1') {
          return res.status(400).json({ error: 'Dhoma është tashmë e rezervuar' });
      }

      // Perform the reservation
      const insertQuery = `
          INSERT INTO reservations (user_id, room_id, from_date, to_date)
          VALUES (?, ?, ?, ?)
      `;

      db.query(insertQuery, [user_id, room_id, from_date, to_date], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Gabim gjatë rezervimit' });
          }

          // Update the room's reservation status
          const updateRoomQuery = `UPDATE rooms SET reservation_status = '1' WHERE id = ?`;

          db.query(updateRoomQuery, [room_id], (err, updateResult) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Gabim gjatë përditësimit të statusit të dhomës' });
              }

              res.json({ message: 'Dhoma u rezervua me sukses!' });
          });
      });
  });
});

// Get all reservations for admin, including user details
router.get('/admin/reservations', (req, res) => {
  const query = `
    SELECT rooms.type AS room_name, rooms.qmimi AS room_price, 
           reservations.from_date, reservations.to_date
    FROM reservations
    JOIN rooms ON reservations.room_id = rooms.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gabim gjatë marrjes së rezervimeve' });
    }

    res.json(results);
  });
});




// Cancel a reservation
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
      return res.status(500).json({ message: 'Gabim gjatë anulimit të rezervimit' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or already available' });
    }

    res.status(200).json({ message: 'Reservation canceled successfully' });
  });
});

module.exports = router;
