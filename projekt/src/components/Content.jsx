import React from 'react'
import ContentHeader from '../components/ContentHeader'
import Card from '../components/Card'
import '../styles/content.css'
import Klients from '../components/Klients'


const Content = () => {
  return   <div className='content'>
      <ContentHeader />
     <Card />
     <Klients />
      
  </div>
  
}

export default Content
