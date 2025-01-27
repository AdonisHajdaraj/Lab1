import React from 'react'
import { BiBookAlt,BiBed, BiHelpCircle, BiHome,BiTask,  BiCookie, BiTime, } from 'react-icons/bi'
import  '../styles/sidebar.css'
import { Link } from 'react-router-dom'
import { BsFillPeopleFill } from 'react-icons/bs';


const USidebar = () => {
  return (
    <div className='menu'>
        <div className="logo">
            <BiBookAlt  className='logo-icon'/>
            <h2>Hotel</h2>
        </div>

        <div className="menu--list">
        <Link to="/user-dashboard"  className="item">
                <BiHome className='icon' />
                Dashboard
            </Link>
        </div>
        <div className="menu--list">
        <Link to="/user-dhomat"  className="item">
                <BiBed className='icon' />
                Dhomat
            </Link>
        </div>
        <div className="menu--list">
        <Link to="/user-rezervo"  className="item">
                <BiBed className='icon' />
                Rezervo
            </Link>
        </div>
    
        <div className="menu--list">
            <Link to="/user-menu"  className="item">
                <BsFillPeopleFill className='icon' />
               Menu
            </Link>
        
        </div>

        
       


 
        
        <div className="menu--list">
        <Link to="/user-help"  className="item">
                <BiHelpCircle className='icon' />
                Help 
            </Link>
        </div>

        <div className="menu--list">
        <Link to="/logout"  className="item">
                <BiHelpCircle className='icon' />
                Logout
            </Link>
        </div>

      
    
    

      
    </div>
  )
}

export default USidebar
