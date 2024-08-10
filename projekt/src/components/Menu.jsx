import React, { useState } from 'react';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("mengjes");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFood, setNewFood] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddFood = () => {
    console.log(`Ushqimi i ri për ${selectedCategory}: ${newFood}`);

    setNewFood("");
   
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <h2>Menuja e Ushqimit</h2>
      <select className="form-select mb-3" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="mengjes">Mengjes</option>
        <option value="dreke">Dreka</option>
        <option value="mbremje">Mbrëmje</option>
      </select>
      {selectedCategory === "mengjes" && (
        <table className="table">
          <thead>
            <tr>
              <th>Ushqimi</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Omletë</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            <tr>
              <td>Spageti Carbonara</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            {}
          </tbody>
        </table>
      )}
      {selectedCategory === "dreke" && (
        <table className="table">
          <thead>
            <tr>
              <th>Ushqimi</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Peshk në tigan</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            <tr>
              <td>Salmon me perime të skuqura</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            {}
          </tbody>
        </table>
      )}
      {selectedCategory === "mbremje" && (
        <table className="table">
          <thead>
            <tr>
              <th>Ushqimi</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pica</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            <tr>
              <td>Burger me qoftë dhe patate</td>
              <td>
                <button className="btn btn-primary">Edito</button>
                <button className="btn btn-danger">Fshij</button>
              </td>
            </tr>
            {}
          </tbody>
        </table>
      )}
      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Shto Ushqim</button>
        {showAddForm && (
          <div className="mt-3">
            <input type="text" className="form-control" value={newFood} onChange={(e) => setNewFood(e.target.value)} placeholder="Shkruaj ushqimin e ri" />
            <button className="btn btn-success mt-2" onClick={handleAddFood}>Ruaj</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
