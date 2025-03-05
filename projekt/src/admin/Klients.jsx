import React, { useState, useEffect } from 'react';
import '../styles/klients.css';
import image7 from '../assets/image7.jpeg';

const TeacherList = () => {
    // State to hold the fetched data
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);  // To handle loading state

    // Fetch data from the API
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch('http://localhost:3008/v2/login');
                const data = await response.json();
                setTeachers(data);  // Assuming the response is an array of teachers
            } catch (error) {
                console.error("Error fetching teachers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className="teacher--list">
            <div className="list--header">
                <h2>Klients</h2>
                <select onChange={(e) => console.log(e.target.value)}>
                    <option value="english">English</option>
                    <option value="hindi">Albanian</option>
                </select>
            </div>
            <div className="list--container">
                {loading ? (
                    <p>Loading...</p>  // Show loading text while fetching data
                ) : (
                    teachers.map((teacher, index) => (
                        <div className="list" key={index}>
                            <div className="teacher--detail">
                                <img src={teacher.image || image7} alt={teacher.name} />
                                <h2>{teacher.name}</h2>
                            </div>
                            <span>{teacher.duration}</span>
                            <span>{teacher.cost}</span>
                            <span className="teacher--todo">:</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TeacherList;
