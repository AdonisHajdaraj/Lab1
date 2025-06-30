import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../user/UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaClipboardList, FaHotel, FaEnvelope } from 'react-icons/fa';

const UDashboard = () => {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const [reservationCount, setReservationCount] = useState(0);
  const [totalHotelReservations, setTotalHotelReservations] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3008/user/reservations/count/${userId}`)
        .then(res => setReservationCount(res.data.count))
        .catch(err => console.error('Gabim me rezervimet:', err));

      axios.get(`http://localhost:3008/reservations/count`)
        .then(res => setTotalHotelReservations(res.data.count))
        .catch(err => console.error('Gabim me rezervimet totale:', err));

      axios.get(`http://localhost:3008/count`)
        .then(res => setFeedbackCount(res.data.count))
        .catch(err => console.error('Gabim me feedback count:', err));

      axios.get(`http://localhost:3008/user/info/${userId}`)
        .then(res => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Gabim me të dhënat:', err);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />

      <main className="flex-grow-1 p-4 overflow-auto">
        <header className="mb-4 border-bottom pb-2">
          <h2 className="text-primary fw-bold">
            Mirësevini, {userName || 'User'}!
          </h2>
        </header>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <>
            {/* Karta */}
            <section className="d-flex gap-4 flex-wrap mb-4">
              <div
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '220px', borderLeft: '5px solid #198754' }}
              >
                <FaClipboardList size={40} className="mb-2 text-success" />
                <h5 className="mb-1">Rezervimet e tua</h5>
                <p className="display-6 fw-bold mb-0">{reservationCount}</p>
              </div>

              <div
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '220px', borderLeft: '5px solid #ffc107' }}
              >
                <FaHotel size={40} className="mb-2 text-warning" />
                <h5 className="mb-1">Rezervime totale Te hotelit</h5>
                <p className="display-6 fw-bold mb-0">{totalHotelReservations}</p>
              </div>

              <div
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '220px', borderLeft: '5px solid #0d6efd' }}
              >
                <FaEnvelope size={40} className="mb-2 text-primary" />
                <h5 className="mb-1">Feedback nga përdoruesit per hotelin</h5>
                <p className="display-6 fw-bold mb-0">{feedbackCount}</p>
              </div>
            </section>

            {/* Të dhënat personale */}
            <section className="bg-white rounded shadow-sm p-4">
              <h4 className="text-secondary mb-3">Të dhënat personale</h4>
              <div className="row">
                <div className="col-md-4">
                  <p><strong>Emri:</strong> {userInfo.name}</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
                <div className="col-md-4">
                  <p><strong>ID:</strong> {userInfo.id}</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default UDashboard;
