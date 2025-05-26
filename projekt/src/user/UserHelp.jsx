import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

function UHelp() {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    // Validimi bazik email dhe pyetje
    if (!email.trim()) {
      setErrorMsg('Ju lutem shkruani email-in tuaj.');
      return;
    }
    // Validim i thjeshtë për formatin e email-it
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
      setShow(false);
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

        {/* Help Content */}
        <div className="col-md-9">
          <div className="container mt-5">
            <h1 className="text-center mb-4">Qendra e Ndihmës</h1>

            {/* Këtu mund të shtoni edhe accordion me pyetjet e shpeshta */}

            {/* Butoni për të hapur modalin */}
            <div className="text-center mt-4">
              <Button variant="primary" onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setShow(true);
              }}>
                Dërgo pyetje të re
              </Button>
            </div>

            {/* Mesazhi për sukses */}
            {successMsg && <Alert variant="success" className="mt-3">{successMsg}</Alert>}
          </div>
        </div>
      </div>

      {/* Modal për dërgimin e pyetjes */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dërgo Pyetje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email-i juaj</Form.Label>
              <Form.Control
                type="email"
                placeholder="Shkruani email-in tuaj"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formQuestion">
              <Form.Label>Pyetja juaj</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Shkruani pyetjen tuaj këtu..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Mbyll
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Dërgo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UHelp;
