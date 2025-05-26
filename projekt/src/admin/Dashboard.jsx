import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';


const Dashboard = () => {
  // Supozojmë që ruan userId në localStorage ose mund ta marrësh nga token/session
  const userId = localStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState(null);
  const [reservationsCount, setReservationsCount] = useState(null);
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

    // Merr info përdoruesi dhe numrin e rezervimeve paralelisht
    Promise.all([
      axios.get(`http://localhost:3008/user/info/${userId}`),
      axios.get(`http://localhost:3008/user/reservations/count/${userId}`)
    ])
      .then(([userRes, countRes]) => {
        setUserInfo(userRes.data);
        setReservationsCount(countRes.data.count);
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
            Welcome, {userInfo ? userInfo.name : 'User'}
          </h2>
        </header>

        <section className="bg-white rounded shadow-sm p-4 h-100">
          {loading && <p>Duke ngarkuar të dhënat...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && userInfo && (
            <>
              <h4>Të dhënat personale</h4>
              <p><strong>Emri:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>

              <h4>Rezervime</h4>
              <p>Gjithsej rezervime: <strong>{reservationsCount !== null ? reservationsCount : 'N/A'}</strong></p>

              <hr />
         
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
