import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const Puntoret = () => {
    const [employees, setEmployees] = useState([]);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [addModalShow, setAddModalShow] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        sname: '',
        role: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3008/puntoret')
            .then(res => setEmployees(res.data))
            .catch(err => console.log(err));
    };

    const openDeleteModal = (employee) => {
        setSelectedEmployee(employee);
        setDeleteModalShow(true);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setDeleteModalShow(false);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3008/puntoret/${selectedEmployee.id}`)
            .then(() => {
                const updatedEmployees = employees.filter(employee => employee.id !== selectedEmployee.id);
                setEmployees(updatedEmployees);
                closeModal();
            })
            .catch(err => console.log(err));
    };

    const openAddModal = () => {
        setAddModalShow(true);
    };

    const closeAddModal = () => {
        setAddModalShow(false);
        setNewEmployee({ name: '', sname: '', role: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = () => {
        axios.post('http://localhost:3008/puntoret', newEmployee)
            .then(res => {
                setEmployees([...employees, res.data]);
                closeAddModal();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Puntoret e hotelit</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Roli</th>
                        <th>Fshije</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.sname}</td>
                            <td>{employee.role}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-sm btn-success mb-3" onClick={openAddModal}>Add</button>
            <Modal show={deleteModalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {selectedEmployee?.name}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </Modal.Footer>
            </Modal>
            <Modal show={addModalShow} onHide={closeAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={newEmployee.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname:</label>
                        <input type="text" className="form-control" id="surname" name="sname" value={newEmployee.sname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <input type="text" className="form-control" id="role" name="role" value={newEmployee.role} onChange={handleInputChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleAddEmployee}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Puntoret;
