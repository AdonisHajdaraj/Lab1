import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Nëse roli nuk është në listë, ndalo hyrjen
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
