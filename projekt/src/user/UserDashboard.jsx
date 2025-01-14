import React from 'react'
import Sidebar from '../user/UserSidebar';
import Content from '../user/UserCard';
import Profile from '../user/UserProfileHeader';


const UDashboard = () => {
    return (
     
     
          
        <div className="dashboard--content">
          <Sidebar />
          <Content />
          <Profile />
        </div>
     
        
     
    )
  }
  
  export default UDashboard