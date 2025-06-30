import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';
import { FaEnvelope, FaShoppingCart, FaHotel } from 'react-icons/fa';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState(null);
  const [reservationsCount, setReservationsCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [totalHotelReservations, setTotalHotelReservations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID nuk u gjet.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([
      axios.get(`http://localhost:3008/user/info/${userId}`),
      axios.get(`http://localhost:3008/user/reservations/count/${userId}`),
      axios.get(`http://localhost:3008/count`),
      axios.get(`http://localhost:3008/reservations/count`) // total rezervime
    ])
      .then(([userRes, reservationRes, feedbackRes, totalRes]) => {
        setUserInfo(userRes.data);
        setReservationsCount(reservationRes.data.count);
        setFeedbackCount(feedbackRes.data.count);
        setTotalHotelReservations(totalRes.data.count);
      })
      .catch(() => {
        setError('Gabim gjatë marrjes së të dhënave.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />

      <main className="flex-grow-1 p-4 overflow-auto">
        <header className="mb-4 border-bottom pb-2">
          <h2 className="text-primary fw-bold">
            Mirësevini, {userInfo ? userInfo.name : 'User'}
          </h2>
        </header>

        {loading && <p>Duke ngarkuar të dhënat...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && userInfo && (
          <>
            {/* Profili i përdoruesit */}
            <section className="mb-4">
              <div className="card shadow-sm border-0 p-4 bg-white">
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0d6efd&color=fff&rounded=true&size=100`}
                    alt="Avatar"
                    className="rounded-circle border border-3 border-primary"
                    width="100"
                    height="100"
                  />
                  <div>
                    <h4 className="mb-1">{userInfo.name}</h4>
                    <p className="text-muted mb-1">Email: {userInfo.email}</p>
                    <span className="badge bg-primary">Administrator</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistikat */}
            <section className="d-flex gap-4 flex-wrap">
              <div 
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '200px', borderLeft: '5px solid #0d6efd' }}
              >
                <FaEnvelope size={40} className="mb-2 text-primary" />
                <h5 className="mb-1">Feedback nga përdoruesit</h5>
                <p className="display-6 fw-bold mb-0">
                  {feedbackCount !== null ? feedbackCount : 'N/A'}
                </p>
              </div>

              <div 
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '200px', borderLeft: '5px solid #198754' }}
              >
                <FaShoppingCart size={40} className="mb-2 text-success" />
                <h5 className="mb-1">Rezervimet e mia</h5>
                <p className="display-6 fw-bold mb-0">
                  {reservationsCount !== null ? reservationsCount : 'N/A'}
                </p>
              </div>

              <div 
                className="flex-fill bg-white rounded shadow-sm p-4 text-center"
                style={{ minWidth: '200px', borderLeft: '5px solid #ffc107' }}
              >
                <FaHotel size={40} className="mb-2 text-warning" />
                <h5 className="mb-1">Rezervime totale në hotel</h5>
                <p className="display-6 fw-bold mb-0">
                  {totalHotelReservations !== null ? totalHotelReservations : 'N/A'}
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
