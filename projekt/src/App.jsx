import React from 'react';

import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './admin/Dashboard';
import Dhomat from './admin/Dhomat';
import Rezervimet from './admin/Rezervimet';
import Help from './admin/Help';
import Rezervo from './admin/Rezervo';
import Orari  from './admin/Orari'
import Puntoret from './admin/Puntoret';
import  Menu from './admin/Menu';
import CreatePuntoret from './admin/CreatePuntoret';
import AddFood from './admin/AddFood';
import EditFood from './admin/EditFood';
import AddOrari from './admin/AddOrari';
import UpdatePuntoret from './admin/UpdatePuntoret';

import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';


import UDashboard from './user/UserDashboard';
import UDhomat from './user/UserDhomat';
import UHelp from './user/UserHelp';
import UApp from './user/UserRezervo';
import UMenu from './user/UserMenu';





const App = () => {
  return (
  
     
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
         
          <Route path='/dhomat' element={<Dhomat />} />
          <Route path='/rezervimet' element={<Rezervimet />} />
          <Route path='/help' element={<Help />} />
          <Route path='/rezervo' element={<Rezervo />} />
          <Route path='/puntoret' element={<Puntoret />} />
          <Route path='/create' element={<CreatePuntoret />}/>
          <Route path='/update/:id' element={<UpdatePuntoret />}/>
          <Route path='/menu' element={<Menu />} />
          <Route path='/orari' element={<Orari />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/addfood' element={<AddFood/>}/>                      
          <Route path='/editfood/:id' element={<EditFood/>}/>
          <Route path='/addorari' element={<AddOrari />}/>
          <Route path='/logout' element={<Logout />} />

          <Route path='/user-dashboard' element={<UDashboard />} />
          <Route path='/user-help' element={<UHelp />} />
          <Route path='/user-rezervo' element={<UApp />} />
          <Route path='/user-dhomat' element={<UDhomat />} />
          <Route path='/user-menu' element={<UMenu />} />

   
        </Routes>
       

  );
};

export default App;
