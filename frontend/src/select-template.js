import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import './home.css';

import './Popup.css';
import './home.css';

import './stemplate.css'

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
      <h1>The Template</h1>
      <div>
        {templateData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Question Number</th>
                <th>Subpart</th>
                <th>Max Marks</th>
                <th>CO Number</th>
                <th>BT Number</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {templateData.map(template => (
                <tr key={template.id}>
                 <td>{template.questionNumber}</td>
                 <td>{template.subpart}</td>
                 <td>{template.maxMarks}</td>
                 <td>{template.coNumber}</td>
                 <td>{template.btNumber}</td>
                 <td>
                    <input
                      type="text"
                      value={obtainedMarks[template.id] || ''}
                      onChange={(e) => handleObtainedMarksChange(template.id, e.target.value)}
                    />
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No templates available.</p>
        )}
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <Link to={'/'}><button className='logout'>Logout</button></Link>
    </div>
 );
};
