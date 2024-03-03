import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './coordinator.css';

export const Teacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    acad: '',
    sub: '',
    sem: '',
    dept: '',
    subc: '',
    ext: '',
  
  });
  const [courseCoordinatorDetails, setCourseCoordinatorDetails] = useState({
    acad: '',
    sub: '',
    sem: '',
    dept: '',
    ext: '',
  });
  const handleInputChange = (event) => {
    console.log('Input changed:', event.target.name, event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRadioChange = async (event) => {
    if (event.target.value === 'temp') {
      if (event.target.value === 'temp') {
        // Set course coordinator details in state
        setCourseCoordinatorDetails({
          acad: formData.acad,
          sub: formData.sub,
          sem: formData.sem,
          dept: formData.dept,
          ext: formData.ext,
        });
  
        navigate('/select-template');
      }
  
      // Send a server request to create a database
      try {
        const response = await fetch('http://localhost:8081/tdatabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            academicyear: formData.acad,
            subject: formData.sub,
            semester: formData.sem,
            department: formData.dept,
            subc: formData.subc,
            ext: formData.ext
          }),
        });

        if (response.ok) {
          console.log('Database created successfully');
          // Add any additional logic or redirect here
        } else {
          console.error('Failed to create database');
          // Handle error as needed
        }
      } catch (error) {
        console.error('Error during database creation:', error);
        // Handle error as needed
      }
    }
  };

  return (
    <body>
      <div className='container'>
      <div className="main"></div>
        <select id="temp" name="temp">
          <option value="create">QP template access</option>
        </select>
        <div>
          <Link to={'/'}><button className='logout'>Logout</button></Link>
        </div>
        <h3>Institute Name: R V College of Engineering</h3>
        <form action="NAME.DD">
          <div>Academic year: <input type="number" name="acad" onChange={handleInputChange} /></div>
          <div>
            <label htmlFor="sub">Subject:</label>
            <select id="sub" name="sub" onChange={handleInputChange}>
            <option value="sel">Select dept</option>
              <option value="math">Mathematics</option>
               <option value="che">Chemistry</option>
            </select>
          </div>
          <div>
            <label htmlFor="sem">Semester:</label>
            <select id="sem" name="sem" onChange={handleInputChange}>
            <option value="sel">Select sem</option>
            <option value="oddsem_y1">UG Odd 1Y</option>
            <option value="evensem_y1">UG Even 1Y</option>
            <option value="oddsem_y2">UG Odd 2Y</option>
            <option value="evensem_y2">UG Even 2Y</option>
            </select>
          </div>
          <div>
            <label htmlFor="dept">Department:</label>
            <select id="dept" name="dept" onChange={handleInputChange}>
            <option value="sel">Select dept</option>
            <option value="cse">Computer Science and Engineering</option>
            <option value="cy">Computer Science(Cyber security)</option>
            <option value="cd">Computer Science(Data Science)</option>
            </select>
          </div>
          <div>Subject code:
            <select id="subc" name="subc" onChange={handleInputChange}>
            <option value="sel">Select code</option>
            <option value="ma">22ma12</option>
            <option value="ch">22ch12</option>
            </select>
          </div>
          <div>Exam type:
            <select id="ext" name="ext" onChange={handleInputChange}>
            <option value="sel">Select exam type</option>
            <option value="Reg">Regular</option>
            <option value="fastt">Fast track</option>
            </select>
          </div>
          <hr />
          <h4>Selection Screen</h4>
          <div>
            <div className="me">
              <label>Select Template</label>
              <input type="radio" name="opt" value="temp" onChange={handleRadioChange} />
            </div>
            <div className="me">
              <label>Display</label>
              <input type="radio" name="opt" value="dis" />
            </div>

          </div>
        </form>
        <button type="button" className='buttonc'>Submit</button>
      </div>
    </body>
  );
};
