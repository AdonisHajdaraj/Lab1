import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';

const Dhomat = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: '',
    pershkrimi: '',
    image: null, // Do mbahet File objekti
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3008/dhomat')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  // Handler për ndryshimin e inputeve (për text)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handler për ndryshimin e file input për imazhin
  const handleFileChange = (e) => {
    setValues(prev => ({
      ...prev,
      image: e.target.files[0] || null
    }));
  };

  // POST: shtim dhome me imazh
  const handleAdd = () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('pershkrimi', values.pershkrimi);
    if (values.image) formData.append('image', values.image);

    axios.post('http://localhost:3008/dhomat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        setData([...data, res.data]);
        setValues({ name: '', pershkrimi: '', image: null });
        setShowModal(false);
      })
      .catch(err => console.log(err));
  };

  // PUT: përditësim dhome me imazh
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('pershkrimi', values.pershkrimi);
    if (values.image && typeof values.image !== 'string') {
      // Në edit, nëse zgjidhet imazh i ri, dërgo atë, përndryshe jo
      formData.append('image', values.image);
    }

    axios.put(`http://localhost:3008/dhomat/${editId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        const updatedData = data.map(room => {
          if (room.id === editId) {
            return res.data;
          }
          return room;
        });
        setData(updatedData);
        setEditId(null);
        setValues({ name: '', pershkrimi: '', image: null });
        setShowModal(false);
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    const room = data.find(r => r.id === id);
    if (room) {
      setValues({
        name: room.name,
        pershkrimi: room.pershkrimi,
        image: room.image || null // string URL apo null
      });
      setEditId(id);
      setShowModal(true);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3008/dhomat/${id}`)
      .then(() => {
        setData(data.filter(room => room.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row">
              {data.map((dhoma) => (
                <div key={dhoma.id} className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <h5 className="card-title">{dhoma.name}</h5>
                    {dhoma.image && <img src={dhoma.image} alt="room" className="card-img-top" />}
                    <div className="card-body">
                      <p>{dhoma.pershkrimi}</p>
                      <button className="btn btn-secondary mr-2" onClick={() => handleEdit(dhoma.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(dhoma.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container text-center mb-3">
            <button className="btn btn-success" onClick={() => setShowModal(true)}>Add</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Edit Room' : 'Add Room'}</h5>
                <button type="button" className="close" onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setValues({ name: '', pershkrimi: '', image: null });
                }} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={values.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pershkrimi">Description</label>
                    <textarea className="form-control" id="pershkrimi" rows="3" value={values.pershkrimi} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    {/* Në edit, nëse image është URL (string), shfaqet si tekst, përndryshe file input */}
                    {typeof values.image === 'string' && values.image ? (
                      <>
                        <img src={values.image} alt="room" className="img-fluid mb-2" />
                        <input type="file" className="form-control-file" id="image" onChange={handleFileChange} />
                      </>
                    ) : (
                      <input type="file" className="form-control-file" id="image" onChange={handleFileChange} />
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setValues({ name: '', pershkrimi: '', image: null });
                }}>Close</button>
                {editId !== null ? (
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dhomat;
