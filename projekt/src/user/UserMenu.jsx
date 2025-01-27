import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../user/UserSidebar'; 

const UserMenu = () => {
    const [ushqimet, setUshqimet] = useState([]);

    useEffect(() => {
        const fetchAllUshqimet = async () => {
            try {
                const res = await axios.get('http://localhost:3008/menu');
                setUshqimet(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUshqimet();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h2 className="text-center mb-4 text-primary">Menuja e Ushqimit</h2>
                        <table className="table table-hover table-striped table-bordered shadow">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Emri i Ushqimit</th>
                                    <th>Çmimi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ushqimet.map((ushqimi) => (
                                    <tr key={ushqimi.id}>
                                        <td className="align-middle">{ushqimi.name}</td>
                                        <td className="align-middle">{ushqimi.price} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
