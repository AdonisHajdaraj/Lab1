import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const userId = localStorage.getItem('userId');

  const fetchReservations = () => {
    if (!userId) return;

    setLoading(true);
    setError('');
    axios.get(`http://localhost:3008/user/reservations/${userId}`)
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gabim gjatë marrjes së rezervimeve.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, [userId]);

  const deleteReservation = (reservationId) => {
    if (!window.confirm('A jeni i sigurt që dëshironi të fshini këtë rezervim?')) {
      return;
    }

    setDeleteLoadingId(reservationId);
    setDeleteError(null);
    setSuccessMessage(null);

    axios
      .delete(`http://localhost:3008/reservations/${reservationId}`)
      .then((res) => {
        setSuccessMessage(res.data.message || 'Rezervimi u fshi me sukses dhe dhoma u lirua');
        fetchReservations();
      })
      .catch(() => {
        setDeleteError('Gabim gjatë fshirjes së rezervimit.');
      })
      .finally(() => {
        setDeleteLoadingId(null);
      });
  };

  if (!userId) {
    return <Alert variant="warning" className="m-4">Ju lutem identifikohuni për të parë rezervimet.</Alert>;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col 
          md={3} 
          style={{ 
            backgroundColor: '#ffffff', // e bardhë
            minHeight: '100vh', 
            padding: '1.5rem', 
          }}
        >
          <Sidebar />
        </Col>

        {/* Content */}
        <Col 
          md={9} 
          style={{ 
            backgroundColor: '#ffffff', // e bardhë
            padding: '2rem' 
          }}
        >
          <h2 className="mb-4">Rezervimet e tua</h2>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}

          {reservations.length === 0 ? (
            <Alert variant="info" className="text-center">
              Nuk keni bërë ende asnjë rezervim.
            </Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Nr. dhomës</th>
                  <th>Emri dhomës</th>
                  <th>Çmimi</th>
                  <th>Veprime</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.nr}</td>
                    <td>{r.type}</td>
                    <td>{r.qmimi} €</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={deleteLoadingId === r.id}
                        onClick={() => deleteReservation(r.id)}
                      >
                        {deleteLoadingId === r.id ? 'Duke anuluar...' : 'Anulo'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyReservations;
