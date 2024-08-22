import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Puntoret = () => {
    const[puntoret,setPuntoret] = useState([])

    useEffect(()=>{
        const fetchAllPuntoret = async ()=>{
            try{
                const res = await axios.get("http://localhost:3008/puntoret")
                setPuntoret(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllPuntoret()
    },[]);

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:3008/puntoret/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4">Puntoret e hotelit</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Roli</th>
                        <th>Veprimet</th>
                    </tr>
                </thead>
                <tbody>
                    {puntoret.map(puntori => (
                        <tr key={puntori.id}>
                            <td>{puntori.name}</td>
                            <td>{puntori.sname}</td>
                            <td>{puntori.role}</td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>handleDelete(puntori.id)}>Delete</button>
                                <button className="btn btn-light"><Link to={`/update/${puntori.id}`}>Update</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button className="btn btn-light"><Link to="/create">Add</Link></button>
            </div>
        </div>
    )
}
export default Puntoret