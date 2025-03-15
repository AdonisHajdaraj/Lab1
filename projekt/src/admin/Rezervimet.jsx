import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner } from 'react-bootstrap';
import Sidebar from '../admin/Sidebar';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all reservations from the backend
  const fetchReservations = () => {
    setLoading(true);
    axios
      .get('http://localhost:3008/admin/reservations')
      .then((res) => {
        console.log('Rezervimet:', res.data); // Kontrollo të dhënat që merr backend
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError('Gabim gjatë marrjes së rezervimeve');
      });
  };

  useEffect(() => {
    fetchReservations(); // Load reservations on component mount
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <div className="container mt-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Menaxhimi i rezervimeve</h1>
            </div>

            {/* Loading Spinner and Error Alert */}
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Check if there are reservations */}
            {reservations.length > 0 ? (
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Emri i dhomës</th>
                    <th>Qmimi</th>
                    <th>Data e fillimit</th>
                    <th>Data e përfundimit</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.room_id}>
                      <td>{reservation.room_name}</td> {/* Emri i dhomës */}
                      <td>{reservation.room_price} €</td> {/* Qmimi */}
                      <td>{reservation.from_date || 'N/A'}</td> {/* Data e fillimit */}
                      <td>{reservation.to_date || 'N/A'}</td> {/* Data e përfundimit */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              // Alert for no reservations
              reservations.length === 0 && !loading && (
                <Alert variant="info">Nuk ka asnjë rezervim për shfaqur.</Alert>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;
