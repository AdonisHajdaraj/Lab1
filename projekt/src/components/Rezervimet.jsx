import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

function Rezervimet() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', room: 'Room 101', price: '100', date: '2024-04-07' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', room: 'Room 102', price: '120', date: '2024-04-08' }
  ]);

  const [editRow, setEditRow] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRoom, setEditedRoom] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDate, setEditedDate] = useState('');

  const handleAddRow = () => {
    setData([...data, { id: data.length + 1, name: 'New Name', email: 'New Email', room: 'New Room', price: 'New Price', date: 'New Date' }]);
  };

  const handleDeleteRow = (id) => {
    setData(data.filter(row => row.id !== id));
  };

  const handleEdit = (id, name, email, room, price, date) => {
    setEditRow(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditedRoom(room);
    setEditedPrice(price);
    setEditedDate(date);
  };

  const handleSaveEdit = () => {
    setData(data.map(row => {
      if (row.id === editRow) {
        return { ...row, name: editedName, email: editedEmail, room: editedRoom, price: editedPrice, date: editedDate };
      }
      return row;
    }));
    setEditRow(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Rezervimet e bera</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Room</th>
            <th className="text-center">Price</th>
            <th className="text-center">Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td className="align-middle">{editRow === row.id ? <input type="text" className="form-control" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : row.name}</td>
              <td className="align-middle">{editRow === row.id ? <input type="text" className="form-control" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /> : row.email}</td>
              <td className="align-middle">{editRow === row.id ? <input type="text" className="form-control" value={editedRoom} onChange={(e) => setEditedRoom(e.target.value)} /> : row.room}</td>
              <td className="align-middle">{editRow === row.id ? <input type="text" className="form-control" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} /> : row.price}</td>
              <td className="align-middle">{editRow === row.id ? <input type="text" className="form-control" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} /> : row.date}</td>
              <td className="align-middle text-center">
                {editRow === row.id ? (
                  <>
                    <button className="btn btn-success" onClick={handleSaveEdit}><BsPencilSquare /> Save</button>
                    <button className="btn btn-secondary ml-2" onClick={() => setEditRow(null)}><BsTrash /> Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={() => handleEdit(row.id, row.name, row.email, row.room, row.price, row.date)}><BsPencilSquare /> Edit</button>
                    <button className="btn btn-danger ml-2" onClick={() => handleDeleteRow(row.id)}><BsTrash /> Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleAddRow}>Add Room</button>
    </div>
  );
}

export default Rezervimet;
