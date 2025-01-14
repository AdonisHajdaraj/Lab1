import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import Sidebar from '../user/UserSidebar';

function UApp() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (url) => {
    setLoading(true);
    axios.get(url)
      .then(res => {
        setData(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  const reserveRoom = (roomType) => {
    alert(`Dhoma ${roomType} u rezervua!`);
  };

  const renderTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipi i Dhomes</th>
            <th>Numri i Dhomes</th>
            <th>Qmimi i Dhomes</th>
            <th>Rezervo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((room, index) => (
            <tr key={index}>
              <td>{room.name}</td>
              <td>{room.nr}</td>
              <td>{room.qmimi}</td>
              <td><Button variant="primary" onClick={() => reserveRoom(room.tipi)}>Rezervo</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const showTable = (url) => {
    fetchData(url);
    setSelectedTable(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <Container className="mt-3">
            <DropdownButton id="dropdown-basic-button" title="Llojet e Dhomave">
              <Dropdown.Item onClick={() => showTable('http://localhost:3008/standarte')}>Dhoma Standarte</Dropdown.Item>
              <Dropdown.Item onClick={() => showTable('http://localhost:3008/vip')}>Dhoma VIP</Dropdown.Item>
              <Dropdown.Item onClick={() => showTable('http://localhost:3008/familjare')}>Dhoma Familjare</Dropdown.Item>
              <Dropdown.Item onClick={() => showTable('http://localhost:3008/ekslusive')}>Dhoma Ekslusive</Dropdown.Item>
              <Dropdown.Item onClick={() => showTable('http://localhost:3008/suite')}>Dhoma Suite</Dropdown.Item>
            </DropdownButton>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {selectedTable || renderTable()}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default UApp;
