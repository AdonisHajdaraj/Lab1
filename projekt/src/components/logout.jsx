import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // kjo ishte problemi
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Jeni duke dalë nga llogaria</h2>
      <div className="mt-3">
        <button className="btn btn-danger me-3" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Anulo
        </button>
      </div>
    </div>
  );
};

export default Logout;
