import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/users', { email, password });
    
      console.log(response.data);
 
    } catch (error) {
      console.error('Gabim gjatë verifikimit të hyrjes:', error);
      setError('Email-i ose fjalëkalimi i gabuar.');
    }
  };

  const handleSignUpClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/users', { name, email, password });
     
      console.log(response.data);

      setShowModal(false); 
    } catch (error) {
      console.error('Gabim gjatë regjistrimit:', error);
      setError('Ka ndodhur një problem gjatë regjistrimit.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h5 className="card-title text-center mb-4">Login</h5>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
              </form>
              <div className="text-center">
                <span>Don't have an account? </span>
                <button className="link-primary btn btn-link" onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignUp}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="emailSignUp" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailSignUp" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passwordSignUp" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordSignUp" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
