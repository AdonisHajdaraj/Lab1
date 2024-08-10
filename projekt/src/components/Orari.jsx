import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Orari = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState({
        name: '',
        role: '',
        h: '',
        m: '',
        me: '',
        e: '',
        p: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3008/orari')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleAddOrEdit = () => {
        if (isEditing) {
            handleUpdate();
        } else {
            handleAdd();
        }
    };

    const handleAdd = () => {
        axios.post('http://localhost:3008/orari', values)
            .then(res => {
                setData([...data, res.data]);
                setValues({ name: '', role: '', h: '', m: '', me: '', e: '', p: '' });
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        const employeeToEdit = data.find(employee => employee.id === id);
        if (employeeToEdit) {
            setValues({
                name: employeeToEdit.name,
                role: employeeToEdit.role,
                h: employeeToEdit.h,
                m: employeeToEdit.m,
                me: employeeToEdit.me,
                e: employeeToEdit.e,
                p: employeeToEdit.p
            });
            setEditId(id);
            setIsEditing(true);
            setShowModal(true);
        }
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3008/orari/${editId}`, values)
            .then(res => {
                const updatedData = data.map(employee => {
                    if (employee.id === editId) {
                        return res.data;
                    }
                    return employee;
                });
                setData(updatedData);
                setEditId(null);
                setValues({ name: '', role: '', h: '', m: '', me: '', e: '', p: '' });
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3008/orari/${id}`)
            .then(() => {
                const updatedData = data.filter(employee => employee.id !== id);
                setData(updatedData);
            })
            .catch(err => console.log(err));
    };

    const closeModal = () => {
        setIsEditing(false);
        setShowModal(false);
        setValues({ name: '', role: '', h: '', m: '', me: '', e: '', p: '' });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Orari i Puntorve</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Emri</th>
                        <th>Roli</th>
                        <th>Hane</th>
                        <th>Marte</th>
                        <th>Merkure</th>
                        <th>Ejte</th>
                        <th>Premte</th>
                        <th>Veprimet</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>{employee.h}</td>
                            <td>{employee.m}</td>
                            <td>{employee.me}</td>
                            <td>{employee.e}</td>
                            <td>{employee.p}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(employee.id)}>Edit</button>
                                <button className="btn btn-sm btn-danger ml-2" onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-center">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>Add </button>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Emri:</label>
                        <input type="text" className="form-control" id="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Roli:</label>
                        <input type="text" className="form-control" id="role" value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hane">Hane:</label>
                        <input type="text" className="form-control" id="hane" value={values.h} onChange={(e) => setValues({ ...values, h: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="marte">Marte:</label>
                        <input type="text" className="form-control" id="marte" value={values.m} onChange={(e) => setValues({ ...values, m: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="merkure">Merkure:</label>
                        <input type="text" className="form-control" id="merkure" value={values.me} onChange={(e) => setValues({ ...values, me: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ejte">Ejte:</label>
                        <input type="text" className="form-control" id="ejte" value={values.e} onChange={(e) => setValues({ ...values, e: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="premte">Premte:</label>
                        <input type="text" className="form-control" id="premte" value={values.p} onChange={(e) => setValues({ ...values, p: e.target.value })} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddOrEdit}>{isEditing ? 'Save Changes' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Orari;
