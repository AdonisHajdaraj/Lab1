import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

function UHelp() {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('Ju lutem shkruani email-in tuaj.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Ju lutem shkruani një email të vlefshëm.');
      return;
    }

    if (!question.trim()) {
      setErrorMsg('Ju lutem shkruani pyetjen tuaj.');
      return;
    }

    try {
      await axios.post('http://localhost:3008/questions', {
        email: email,
        question: question,
      });
      setSuccessMsg('Pyetja u dërgua me sukses!');
      setQuestion('');
      setEmail('');
    } catch (error) {
      console.error('Gabim gjatë dërgimit të pyetjes:', error);
      setErrorMsg('Gabim gjatë dërgimit të pyetjes');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Feedback Content */}
        <div className="col-md-9">
          <div className="container mt-5">
            <h1 className="text-center mb-4">Feedback</h1>

            {/* Forma e feedback-ut që shfaqet gjithmonë */}
            <Form>
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              {successMsg && <Alert variant="success">{successMsg}</Alert>}

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email-i juaj</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Shkruani email-in tuaj"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formQuestion" className="mb-3">
                <Form.Label>Feedback-u juaj</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Shkruani feedback-un tuaj këtu..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" onClick={handleSubmit}>
                  Dërgo
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UHelp;
