import React from 'react'
import ProfileHeader from '../user/UserProfileHeader';
import '../styles/profile.css';
import image7 from '../assets/image7.jpeg';
import { BiBook } from 'react-icons/bi';
const courses = [
  {
   
   
  },
  {

  },
  {
   
  },

]
const UProfile = () => {
  return <div className='profile'>
    <ProfileHeader />
  <div className="user--profile">
    <div className="user--detail">
      <img  className="a"src={image7} alt="" />
      <h3 className='username'>Filan Fisteku </h3>
      <span className='profession'>Klient</span>

    </div>
    <div className="user-courses">
      {courses.map((coures) =>
    <div className="course">
      <div className="course-detail">
        <div className="course-cover">{coures.icon}</div>
        <div className="course-name">
          <h5 className='title'>{coures.title}</h5>
          <span className='duration'>{coures.duration}</span>
        </div>
      </div>
      <div className="action">:</div>
    </div>
    )}
    </div>
  </div>
  </div>
  
}

export default UProfile
