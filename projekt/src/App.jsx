import React from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Contactus from './components/Contactus';
import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Dhomat from './components/Dhomat';
import Rezervimet from './components/Rezervimet';
import Help from './components/Help';
import Rezervo from './components/Rezervo';
import Login from './components/Login';
import Signup from './components/Signup';
import Orari  from './components/Orari'
import Puntoret from './components/Puntoret';
import  Menu from './components/Menu';
import CreatePuntoret from './components/CreatePuntoret';
import UpdatePuntoret from './components/UpdatePuntoret';



const Nav = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/Sidebar"></Link>
        </li>
        <li>
          <Link to="/contactus"></Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <div className='dashboard'>
      <Nav /> {}
      <Sidebar />
      <div className="dashboard--content">
     
        <Routes>
          <Route path='/' element={<Content />} />
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
        </Routes>
       
      </div>
    </div>
  );
};

export default App;
