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
import MyReservations from './user/MyReservations';
import PrivateRoute from './components/PrivateRoute';



const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />

      {/* Admin Protected Routes */}
       <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  
      <Route
        path='/dhomat'
        element={
          <PrivateRoute >
            <Dhomat />
          </PrivateRoute>
        }
      />
      <Route
        path='/rezervimet'
        element={
          <PrivateRoute >
            <Rezervimet />
          </PrivateRoute>
        }
      />
      <Route
        path='/help'
        element={
          <PrivateRoute >
            <Help />
          </PrivateRoute>
        }
      />
      <Route
        path='/puntoret'
        element={
          <PrivateRoute>
            <Puntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/create'
        element={
          <PrivateRoute >
            <CreatePuntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/update/:id'
        element={
          <PrivateRoute >
            <UpdatePuntoret />
          </PrivateRoute>
        }
      />
      <Route
        path='/menu'
        element={
          <PrivateRoute >
            <Menu />
          </PrivateRoute>
        }
      />
      <Route
        path='/orari'
        element={
          <PrivateRoute >
            <Orari />
          </PrivateRoute>
        }
      />
      <Route
        path='/addfood'
        element={
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        }
      />
      <Route
        path='/editfood/:id'
        element={
          <PrivateRoute >
            <EditFood />
          </PrivateRoute>
        }
      />
      <Route
        path='/addorari'
        element={
          <PrivateRoute>
            <AddOrari />
          </PrivateRoute>
        }
      />
      <Route
        path='/users'
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      {/* User Protected Routes */}
      <Route
        path='/user-dashboard'
        element={
          <PrivateRoute >
            <UDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-help'
        element={
          <PrivateRoute >
            <UHelp />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-rezervo'
        element={
          <PrivateRoute >
            <UApp />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-dhomat'
        element={
          <PrivateRoute >
            <UDhomat />
          </PrivateRoute>
        }
      />
      <Route
        path='/user-menu'
        element={
          <PrivateRoute>
            <UMenu />
          </PrivateRoute>
        }
      />
  <Route
  path='/r'
  element={
    <PrivateRoute >
      <MyReservations />
    </PrivateRoute>
  }
/>

    </Routes>
  );
};

export default App;
