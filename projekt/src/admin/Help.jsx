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
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë feedback?")) {
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
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-md-9 mt-5">
          <h2 className="text-center mb-4">Feedback nga Përdoruesit</h2>

          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((q) => (
              <div key={q.id} className="card mb-4 shadow-sm border-primary">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{q.email || 'Email i panjohur'}</h6>
                  <p className="card-text"><strong>Feedback:</strong> {q.question}</p>

                  {q.answer && (
                    <div className="alert alert-info mt-3" role="alert" style={{ whiteSpace: 'pre-wrap' }}>
                      <strong>Përgjigje e dhënë:</strong> <br />
                      {q.answer}
                    </div>
                  )}

                  <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() => handleDelete(q.id)}
                  >
                    Fshij Feedback
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fst-italic text-secondary">Nuk ka feedback për t'u shfaqur.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Help;
