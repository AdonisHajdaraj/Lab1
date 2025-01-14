import React from 'react';
import '../styles/klients.css';
import image7 from '../assets/image7.jpeg';

const teachers = [ 
    {
        image: image7,
        name: 'Filan Fisteku',
        duration: 'ff34@gmail.com',
        cost: 'Prishtine',
    },
    {
        image: image7,
        name: 'Filan Fisteku',
        duration: 'ff34@gmail.com',
        cost: 'Prishtine',
    },
    {
        image: image7,
        name: 'Filan Fisteku',
        duration: 'ff34@gmail.com',
        cost: 'Prishtine',
    },
    {
        image: image7,
        name: 'Filan Fisteku',
        duration: 'ff34@gmail.com',
        cost: 'Prishtine',
    },
    {
        image: image7,
        name: 'Filan Fisteku',
        duration: 'ff34@gmail.com',
        cost: 'Prishtine',
    },
];

const TeacherList = () => {
    return (
        <div className="teacher--list">
            <div className="list--header">
                <h2>Klients</h2>
                <select onChange={(e) => console.log(e.target.value)}> { }
                    <option value="english">English</option>
                    <option value="hindi">Albania</option>
                </select>
            </div>
            <div className="list--container">
                {teachers.map((teacher, index) => (
                    <div className="list" key={index}>
                        <div className="teacher--detail">
                            <img src={teacher.image} alt={teacher.name} />
                            <h2>{teacher.name}</h2>
                        </div>
                        <span>{teacher.duration}</span>
                        <span>{teacher.cost}</span>
                        <span className='teacher--todo'>:</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherList;