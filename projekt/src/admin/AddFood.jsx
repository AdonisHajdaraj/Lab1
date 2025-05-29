import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', input.name);
      formData.append('price', input.price);
      if (file) formData.append('image', file);

      await axios.post("http://localhost:3008/menu", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate("/menu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Shto Ushqimin e Ri</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Emri i Ushqimit</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Shkruaj emrin e ushqimit"
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Çmimi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Shkruaj çmimin e ushqimit"
                    onChange={handleChange}
                    name="price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Foto Ushqimi</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" onClick={handleClick}>
                    <i className="bi bi-plus-circle"></i> Shto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
