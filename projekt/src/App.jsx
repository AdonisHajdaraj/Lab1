import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Dashboard from './admin/Dashboard';
import Dhomat from './admin/Dhomat';
import Rezervimet from './admin/Rezervimet';
import Help from './admin/Help';
import Orari from './admin/Orari';
import Puntoret from './admin/Puntoret';
import Menu from './admin/Menu';
import CreatePuntoret from './admin/CreatePuntoret';
import AddFood from './admin/AddFood';
import EditFood from './admin/EditFood';
import AddOrari from './admin/AddOrari';
import UpdatePuntoret from './admin/UpdatePuntoret';
import Users from './admin/Users';

import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';

import UDashboard from './user/UserDashboard';
import UDhomat from './user/UserDhomat';
import UHelp from './user/UserHelp';
import UApp from './user/UserRezervo';
import UMenu from './user/UserMenu';

// 🔐 Komponent për mbrojtjen e rrugeve me kontroll roli
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // tokeni që ruan në login
  const role = localStorage.getItem('userRole'); // roli i përdoruesit

  if (!token) {
    // Nëse nuk ka token ridrejto në login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Nëse roli nuk është në allowedRoles ridrejto në login
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />

      {/* Admin Protected Routes */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/dhomat'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Dhomat />
          </PrivateRoute>
        }
      />
      <Route
        path='/rezervimet'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Rezervimet />
          </PrivateRoute>
        }
      />
      <Route
        path='/help'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Help />
          </PrivateRoute>
        }
      />
      <Route
        path='/puntoret'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Puntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/create'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <CreatePuntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/update/:id'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <UpdatePuntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/menu'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Menu />
          </PrivateRoute>
        }
      />
      <Route
        path='/orari'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Orari />
          </PrivateRoute>
        }
      />
      <Route
        path='/addfood'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AddFood />
          </PrivateRoute>
        }
      />
      <Route
        path='/editfood/:id'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <EditFood />
          </PrivateRoute>
        }
      />
      <Route
        path='/addorari'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AddOrari />
          </PrivateRoute>
        }
      />
      <Route
        path='/users'
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Users />
          </PrivateRoute>
        }
      />

      {/* User Protected Routes */}
      <Route
        path='/user-dashboard'
        element={
          <PrivateRoute allowedRoles={['user']}>
            <UDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-help'
        element={
          <PrivateRoute allowedRoles={['user']}>
            <UHelp />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-rezervo'
        element={
          <PrivateRoute allowedRoles={['user']}>
            <UApp />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-dhomat'
        element={
          <PrivateRoute allowedRoles={['user']}>
            <UDhomat />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-menu'
        element={
          <PrivateRoute allowedRoles={['user']}>
            <UMenu />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
