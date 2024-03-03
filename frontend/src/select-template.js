import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Popup.css';
import './home.css';

export const Selecttemplate = () => {
  const [templateData, setTemplateData] = useState([]);
  const [obtainedMarks, setObtainedMarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:8081/template-data') // Replace with your actual server endpoint
      .then(response => response.json())
      .then(data => setTemplateData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleObtainedMarksChange = (questionNumber, value) => {
    setObtainedMarks(prevMarks => ({
      ...prevMarks,
      [questionNumber]: value,
    }));
  };

  const handleSubmit = () => {
    // Send obtained marks to the server
    fetch('http://localhost:8081/update-obtained-marks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        obtainedMarks,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Obtained marks submitted successfully');
          // Optionally, you can navigate to another page after submission
          navigate('/teacherhome');
        } else {
          console.error('Failed to submit obtained marks:', data.message);
        }
      })
      .catch(error => console.error('Error submitting obtained marks:', error));
  };

  return (
    <div>
      <h1>Select Template</h1>
      <div>
        {templateData.map(template => (
          <div key={template.id}>
            <p>Question Number: {template.questionNumber}</p>
            <p>Subpart: {template.subpart}</p>
            <p>Max Marks: {template.maxMarks}</p>
            <p>CO Number: {template.coNumber}</p>
            <p>BT Number: {template.btNumber}</p>
            <label>Obtained Marks: </label>
            <input
  type="text"
  value={obtainedMarks[template.id] || ''}
  onChange={(e) => handleObtainedMarksChange(template.id, e.target.value)}
/>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <Link to={'/'}><button className='logout'>Logout</button></Link>
    </div>
  );
};
