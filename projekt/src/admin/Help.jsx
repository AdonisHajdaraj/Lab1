import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';

function Help() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios.get('http://localhost:3008/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë pyetje?")) {
      axios.delete(`http://localhost:3008/questions/${id}`)
        .then(() => {
          setQuestions(prev => prev.filter(q => q.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"><Sidebar /></div>
        <div className="col-md-9 mt-5">
          <h2 className="text-center mb-4">Pyetjet e përdoruesve</h2>

          {Array.isArray(questions) && questions.map(q => (
            <div key={q.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{q.email || 'Email jo i disponueshëm'}</h5>
                <p className="card-text"><strong>Pyetje:</strong> {q.question}</p>

                {q.answer && (
                  <div className="alert alert-success">
                    <strong>Përgjigje:</strong> {q.answer}
                  </div>
                )}

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(q.id)}
                >
                  Fshij
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
