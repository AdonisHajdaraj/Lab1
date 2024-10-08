import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePuntoret = () => {
  const [input, setInput] = useState({
    name:"",
    sname:"",
    role:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput(prev=>({...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:3008/puntoret", input)
      navigate("/puntoret")
    }catch(err){
      console.log(err)
    }
  }

  console.log(input)

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form>
            <div className='mb-3'>
                <h1>Shto puntorin e ri</h1>
                <input type='text' placeholder='Emri' onChange={handleChange} name="name"/>
            </div>
            <div className='mb-3'>
                <input type='text' placeholder='Mbiemri' onChange={handleChange} name="sname"/>
            </div>
            <div className='mb-3'>
                <input type='text' placeholder='Roli' onChange={handleChange} name="role"/>
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btn btn-primary" onClick={handleClick}>Add</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePuntoret
