import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  

  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
            <div className="card shadow">
              <div className="card-body p-5">
                <h5 className="card-title text-center mb-4">Login</h5>
                <form>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"  />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                  <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                  </div>
                </form>
                <div className="text-center">
                  <span>Don't have an account? </span>
                  <Link to="/signup" className="link-primary">Sign up</Link>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
  )
}

export default Login;
