import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../user/UserSidebar';

const UDhomat = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3008/dhomat')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    return (
        <div className="container-fluid">
            {/* Flexbox container for sidebar and content */}
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-md-3">
                    <Sidebar />
                </div>

                {/* Content Section */}
                <div className="col-md-9">
                    <div className="container">
                        <div className="row">
                            {data.map((dhoma, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <div className="card">
                                        <h5 className="card-title">{dhoma.name}</h5>
                                        {dhoma.image && (
                                         <img
                                            src={dhoma.image}
                                            alt="room"
                                            className="card-img-top"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        )}

                                        <div className="card-body">
                                            <p>{dhoma.pershkrimi}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UDhomat;
