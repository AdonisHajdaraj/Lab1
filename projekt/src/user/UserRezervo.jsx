import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar';

function UApp() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationDates, setReservationDates] = useState({ from_date: '', to_date: '' });
  const [selectedType, setSelectedType] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchRooms = (type) => {
    setLoading(true);
    setError('');
    setSelectedType(type);
    axios
      .get(`http://localhost:3008/rooms/${type}`)
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Gabim gjatë marrjes së dhomave. Provoni përsëri.');
      });
  };

  const handleReserveClick = (room) => {
    setError('');
    if (!userId) {
      setError('Nuk ka përdorues të identifikuar. Ju lutem hyni në llogarinë tuaj.');
      return;
    }
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleReserve = () => {
    setError('');

    if (!reservationDates.from_date || !reservationDates.to_date) {
      setError('Ju lutem zgjedhni të dy datat.');
      return;
    }

    if (new Date(reservationDates.from_date) >= new Date(reservationDates.to_date)) {
      setError('Data e përfundimit duhet të jetë pas datës së fillimit.');
      return;
    }

    const reservationData = {
      user_id: userId,
      room_id: selectedRoom.id,
      from_date: reservationDates.from_date,
      to_date: reservationDates.to_date,
    };

    axios
      .post(`http://localhost:3008/reserve`, reservationData)
      .then(() => {
        setShowModal(false);
        setReservationDates({ from_date: '', to_date: '' });
        setError('');

        if (selectedType) {
          fetchRooms(selectedType);
        }
      })
      .catch(() => {
        setError('Gabim gjatë rezervimit të dhomës.');
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <div className="container mt-5">
            <h1 className="fw-bold text-center text-primary mb-4">Selekto dhomë</h1>

            <div className="text-center">
              <DropdownButton id="dropdown-basic-button" title="Selekto Tipin e Dhomës">
                {['VIP', 'Standarte', 'Familjare', 'Eksklusive', 'Suite'].map((type) => (
                  <Dropdown.Item key={type} onClick={() => fetchRooms(type)}>
                    {type}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>

            {loading && <div className="text-center mt-3"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {rooms.length > 0 && (
              <Table striped bordered hover className="mt-4 text-center">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Numri i dhomës</th>
                    <th>Çmimi</th>
                    <th>Statusi</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.nr}</td>
                      <td>{room.qmimi} €</td>
                      <td>{room.reservation_status === '0' ? 'E lirë' : 'E rezervuar'}</td>
                      <td>
                        {room.reservation_status === '0' ? (
                          <Button variant="success" onClick={() => handleReserveClick(room)}>Rezervo</Button>
                        ) : (
                          <Button variant="secondary" disabled>Rezervuar</Button>
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

      {/* Modal për rezervim */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rezervo dhomën</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Data e fillimit</Form.Label>
              <Form.Control
                type="date"
                value={reservationDates.from_date}
                onChange={(e) => setReservationDates({ ...reservationDates, from_date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data e përfundimit</Form.Label>
              <Form.Control
                type="date"
                value={reservationDates.to_date}
                onChange={(e) => setReservationDates({ ...reservationDates, to_date: e.target.value })}
              />
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anulo
          </Button>
          <Button variant="primary" onClick={handleReserve}>
            Rezervo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UApp;
