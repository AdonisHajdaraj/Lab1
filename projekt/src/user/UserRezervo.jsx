import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar'; // Assuming Sidebar is in this path

function UApp() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationDates, setReservationDates] = useState({ from_date: '', to_date: '' });

  // Fetch rooms when a room type is selected
  const fetchRooms = (type) => {
    setLoading(true);
    axios
      .get(`http://localhost:3008/rooms/${type}`)
      .then((res) => {
        setRooms(res.data); // Set the rooms data
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError('Error fetching rooms');
      });
  };

  // Open modal for reservation
  const handleReserveClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  // Handle form submission for reserving a room
  const handleReserve = () => {
    if (!reservationDates.from_date || !reservationDates.to_date) {
      alert('Please select both dates.');
      return;
    }

    const reservationData = {
      roomId: selectedRoom.id,
      from_date: reservationDates.from_date,
      to_date: reservationDates.to_date,
    };

    // Call backend to reserve the room
    axios
      .post(`http://localhost:3008/reserve`, reservationData)
      .then(() => {
        alert('Dhoma u rezervua me sukses!');
        setShowModal(false);
        fetchRooms(selectedRoom.type); // Refresh rooms after reservation
      })
      .catch((err) => {
        console.error(err);
        alert('Error reserving the room.');
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar /> {/* Include the sidebar here */}
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Selekto nje dhome</h1>
            </div>

            {/* Dropdown Button to select Room Type */}
            <DropdownButton id="dropdown-basic-button" title="Select Room Type">
              <Dropdown.Item onClick={() => fetchRooms('VIP')}>VIP</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchRooms('Standarte')}>Standarte</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchRooms('Familjare')}>Familjare</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchRooms('Eksklusive')}>Eksklusive</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchRooms('Suite')}>Suite</Dropdown.Item>
            </DropdownButton>

            {/* Loading Spinner and Error Alert */}
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Table to display rooms */}
            {rooms.length > 0 && (
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Numri i dhomes</th>
                    <th>Qmimi</th>
                    <th>Statusi i rezervimit</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.nr}</td>
                      <td>{room.qmimi}</td>
                      <td>{room.reservation_status === '0' ? 'Available' : 'Reserved'}</td>
                      <td>
                        {room.reservation_status === '0' ? (
                          <Button onClick={() => handleReserveClick(room)}>Reservo</Button>
                        ) : (
                          <Button disabled>Reserved</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Modal for reserving a room */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={reservationDates.from_date}
                onChange={(e) => setReservationDates({ ...reservationDates, from_date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={reservationDates.to_date}
                onChange={(e) => setReservationDates({ ...reservationDates, to_date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReserve}>
            Reserve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UApp;
