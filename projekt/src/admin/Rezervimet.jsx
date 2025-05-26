import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner, Button } from 'react-bootstrap';
import Sidebar from '../admin/Sidebar';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Merr rezervimet nga backend
  const fetchReservations = () => {
    setLoading(true);
    setError(null);
    axios
      .get('http://localhost:3008/admin/reservations')
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Gabim gjatë marrjes së rezervimeve');
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Fshij rezervimin dhe përditëso statusin e dhomës
  const deleteReservation = (reservationId) => {
    setDeleteLoadingId(reservationId);
    setDeleteError(null);
    setSuccessMessage(null);

    axios
      .delete(`http://localhost:3008/admin/reservations/${reservationId}`)
      .then((res) => {
        setSuccessMessage(res.data.message || 'Rezervimi u fshi me sukses dhe dhoma u lirua');
        fetchReservations(); // rifresko listën e rezervimeve
      })
      .catch(() => {
        setDeleteError('Gabim gjatë fshirjes së rezervimit');
      })
      .finally(() => {
        setDeleteLoadingId(null);
      });
  };

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

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {reservations.length > 0 ? (
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Emri i dhomës</th>
                    <th>Qmimi</th>
                    <th>Data e fillimit</th>
                    <th>Data e përfundimit</th>
                    <th>Klienti</th>
                    <th>Veprime</th> {/* Kolona për butonin Fshi */}
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.reservation_id}>
                      <td>{reservation.room_name}</td>
                      <td>{reservation.room_price} €</td>
                      <td>{reservation.from_date || 'N/A'}</td>
                      <td>{reservation.to_date || 'N/A'}</td>
                      <td>{reservation.client_name || 'N/A'}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          disabled={deleteLoadingId === reservation.reservation_id}
                          onClick={() => deleteReservation(reservation.reservation_id)}
                        >
                          {deleteLoadingId === reservation.reservation_id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            'Fshi'
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !loading && (
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
