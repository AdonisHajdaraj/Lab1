
import React, { useState } from 'react'
import axios from 'axios';

const CreatePuntoret = () => {
    const [userField, setUserField] = useState({
        emri: "",
        mbiemri: "",
        vitilindja: "",
        roli: "",
        rroga: "",
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const [loading,setLoading]=useState()
  
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post(`http://localhost:3002/punetoret`, userField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <CreatePuntoret/>
    }
    
  return (
    <div>
      <form onSubmit={e => onSubmitChange(e)}>
        
        <div className="form-group">
          <label htmlFor="exampleInputEmri">Emri</label>
          <input type="text" className="form-control" id="exampleInputEmri" aria-describedby="emailHelp" placeholder="Emri" name='emri' onChange={e => changeUserFieldHandler(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputMbiemri">Mbiemri</label>
          <input type="text" className="form-control" id="exampleInputMbiemri" aria-describedby="emailHelp" placeholder="Mbiemri" name='mbiemri' onChange={e => changeUserFieldHandler(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputVitilindja">Vitilindja</label>
          <input type="date" className="form-control" id="exampleInputVitilindja" aria-describedby="emailHelp" placeholder="Vitilindja" name='vitilindja' onChange={e => changeUserFieldHandler(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputRoli">Roli</label>
          <input type="text" className="form-control" id="exampleInputRoli" aria-describedby="emailHelp" placeholder="Roli" name='roli' onChange={e => changeUserFieldHandler(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputRroga">Rroga</label>
          <input type="text" className="form-control" id="exampleInputRroga" aria-describedby="emailHelp" placeholder="Rroga" name='rroga' onChange={e => changeUserFieldHandler(e)} required/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add</button>
      </form>
    </div>
  )
}

export default CreatePuntoret;