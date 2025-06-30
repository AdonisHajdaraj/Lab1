const express = require('express');
const router = express.Router();
const db = require('./db');


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

  if (new Date(from_date) >= new Date(to_date)) {
    return res.status(400).json({ error: 'Data e fillimit duhet të jetë para datës së përfundimit' });
  }

  const checkQuery = 'SELECT reservation_status FROM rooms WHERE id = ?';

  db.query(checkQuery, [room_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gabim në verifikimin e dhomës' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Dhoma nuk u gjet' });
    }

    // Kontrollo nëse është '1' (string) për të rezervuar
    if (results[0].reservation_status === '1') {
      return res.status(400).json({ error: 'Dhoma është tashmë e rezervuar' });
    }

    const insertQuery = `
      INSERT INTO reservations (user_id, room_id, from_date, to_date)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [user_id, room_id, from_date, to_date], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Gabim gjatë rezervimit' });
      }

      // Përditëso me string '1'
      const updateRoomQuery = "UPDATE rooms SET reservation_status = '1' WHERE id = ?";

      db.query(updateRoomQuery, [room_id], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Gabim gjatë përditësimit të statusit të dhomës' });
        }

        res.json({ message: 'Dhoma u rezervua me sukses!' });
      });
    });
  });
});

// ✅ Get all reservations for admin with user details (INCLUDES reservation ID)
router.get('/admin/reservations', (req, res) => {
  const query = `
    SELECT reservations.id AS reservation_id, rooms.type AS room_name, rooms.qmimi AS room_price, 
           reservations.from_date, reservations.to_date,
           login.name AS client_name
    FROM reservations
    JOIN rooms ON reservations.room_id = rooms.id
    JOIN login ON reservations.user_id = login.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gabim gjatë marrjes së rezervimeve' });
    }

    res.json(results);
  });
});

// ✅ Cancel a reservation
router.post('/cancel', (req, res) => {
  const { reservationId } = req.body;

  if (!reservationId) {
    return res.status(400).json({ message: 'Reservation ID is required' });
  }

  const getRoomQuery = 'SELECT room_id FROM reservations WHERE id = ?';

  db.query(getRoomQuery, [reservationId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gabim gjatë marrjes së rezervimit' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Rezervimi nuk u gjet' });
    }

    const roomId = results[0].room_id;

    const deleteReservationQuery = 'DELETE FROM reservations WHERE id = ?';

    db.query(deleteReservationQuery, [reservationId], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gabim gjatë anulimit të rezervimit' });
      }

      const updateRoomQuery = 'UPDATE rooms SET reservation_status = 0 WHERE id = ?';

      db.query(updateRoomQuery, [roomId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Gabim gjatë përditësimit të statusit të dhomës' });
        }

        res.status(200).json({ message: 'Rezervimi u anulua me sukses' });
      });
    });
  });
});

// Count user reservations
router.get('/user/reservations/count/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT COUNT(*) AS count FROM reservations WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Gabim gjatë marrjes së numrit të rezervimeve:', err);
      return res.status(500).json({ error: 'Gabim në server' });
    }

    res.json({ count: result[0].count });
  });
});

// Get user info
router.get('/user/info/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT id, name, email FROM login WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Gabim në server' });
    if (result.length === 0) return res.status(404).json({ error: 'Përdoruesi nuk u gjet' });

    res.json(result[0]);
  });
});

// DELETE reservation by ID (optional if using POST /cancel)
router.delete('/admin/reservations/:id', (req, res) => {
  const reservationId = req.params.id;

  // 1. Gjej id e dhomës për rezervimin
  const getRoomQuery = 'SELECT room_id FROM reservations WHERE id = ?';
  db.query(getRoomQuery, [reservationId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Gabim gjatë marrjes së rezervimit' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Rezervimi nuk u gjet' });
    }

    const roomId = results[0].room_id;

    // 2. Fshi rezervimin
    db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Gabim gjatë fshirjes së rezervimit' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Rezervimi nuk u gjet' });

      // 3. Përditëso statusin e dhomës në '0' (e lirë)
      const updateRoomQuery = "UPDATE rooms SET reservation_status = '0' WHERE id = ?";
      db.query(updateRoomQuery, [roomId], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Gabim gjatë përditësimit të statusit të dhomës' });
        }

        res.json({ message: 'Rezervimi u fshi dhe dhoma u lirua me sukses' });
      });
    });
  });
});
router.get('/reservations/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM reservations';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Gabim në marrjen e numrit të porosive:', err);
      return res.status(500).json({ error: 'Gabim serveri' });
    }

    res.json({ count: results[0].count });
  });
});
router.get('/user/reservations/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT r.id, r.room_id, rm.nr, rm.type, rm.qmimi
    FROM reservations r
    JOIN rooms rm ON r.room_id = rm.id
    WHERE r.user_id = ?`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Gabim gjatë marrjes së rezervimeve:', err);
      return res.status(500).json({ message: 'Gabim gjatë marrjes së rezervimeve.' });
    }

    res.json(results);
  });
});




router.delete('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;

  const checkQuery = 'SELECT room_id FROM reservations WHERE id = ?';
  db.query(checkQuery, [reservationId], (err, results) => {
    if (err) {
      console.error('Gabim gjatë kontrollimit të rezervimit:', err);
      return res.status(500).json({ message: 'Gabim gjatë fshirjes së rezervimit.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Rezervimi nuk u gjet.' });
    }

    const roomId = results[0].room_id;

    const deleteQuery = 'DELETE FROM reservations WHERE id = ?';
    db.query(deleteQuery, [reservationId], (err, deleteResult) => {
      if (err) {
        console.error('Gabim gjatë fshirjes së rezervimit:', err);
        return res.status(500).json({ message: 'Gabim gjatë fshirjes së rezervimit.' });
      }
      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ message: 'Rezervimi nuk u gjet për fshirje.' });
      }

      const updateRoomQuery = "UPDATE rooms SET reservation_status = '0' WHERE id = ?";
      db.query(updateRoomQuery, [roomId], (err, updateResult) => {
        if (err) {
          console.error('Gabim gjatë përditësimit të statusit të dhomës:', err);
          return res.status(500).json({ message: 'Gabim gjatë përditësimit të statusit të dhomës.' });
        }

        console.log('Rezultati i përditësimit të dhomës:', updateResult);
        res.json({ message: 'Rezervimi u fshi me sukses dhe dhoma u lirua' });
      });
    });
  });
});





module.exports = router;
