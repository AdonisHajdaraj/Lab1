import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../user/UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const UDashboard = () => {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const [reservationCount, setReservationCount] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3008/user/reservations/count/${userId}`)
        .then(res => setReservationCount(res.data.count))
        .catch(err => console.error('Gabim me rezervimet:', err));

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="container-fluid p-4 overflow-auto">
        <h2 className="text-primary fw-bold mb-4">Mirësevini, {userName || 'User'}!</h2>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {/* User Info */}
            <div className="col-md-6">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">Të dhënat e tua</h5>
                  <p className="card-text"><strong>Emri:</strong> {userInfo.name}</p>
                  <p className="card-text"><strong>Email:</strong> {userInfo.email}</p>
                  <p className="card-text"><strong>ID:</strong> {userInfo.id}</p>
                </div>
              </div>
            </div>

            {/* Rezervimet */}
            <div className="col-md-6">
              <div className="card bg-primary text-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Rezervimet e tua</h5>
                  <h1 className="display-4">{reservationCount}</h1>
                  <p>Rezervime gjithsej</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UDashboard;
