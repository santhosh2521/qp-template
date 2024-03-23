import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css";
import axios from 'axios';

const Signup = () => {
 const initialValues = {
    fname: "",
    lname: "",
    email: "",
    dob: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
    role: ""
 };

 const [data, setData] = useState([initialValues]);
 const navigate = useNavigate();

 const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedData = [...data];
    updatedData[index][name] = value;
    setData(updatedData);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();

    const tableData = data.map((row) => ({
      fname: row.fname,
      lname: row.lname,
      email: row.email,
      dob: row.dob,
      phoneno: row.phoneno,
      password: row.password,
      role: row.role,
    }));

    if (tableData.length > 0) {
      try {
        const response = await axios.post('http://localhost:8081/signup', tableData);
        if (response.status === 200) {
          setData([initialValues]);
          navigate('/');
        }
      } catch (error) {
        console.error('Error creating template:', error);
      }
    }
 };

 const addRow = () => {
    setData([...data, initialValues]);
 };

 return (
    <div>
      <div className="admin">
        <h2 id="login">Admin</h2>
        <form onSubmit={handleSubmit}>
          {data.map((values, index) => (
            <table key={index} className="signup-table">
              <thead>
                <tr>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Email</th>
                 <th>Date of Birth</th>
                 <th>Phone Number</th>
                 <th>Password</th>
                 <th>Confirm Password</th>
                 <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td><input type="text" placeholder="Enter First name" name='fname' value={values.fname} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type="text" placeholder="Enter Last name" name='lname' value={values.lname} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type="email" placeholder="Enter Email" name='email' value={values.email} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type='date' name='dob' value={values.dob} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type='tel' name='phoneno' value={values.phoneno} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type="password" placeholder="Enter Password" name='password' value={values.password} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type="password" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={(e) => handleChange(e, index)} /></td>
                 <td><input type="text" placeholder="Enter Role (e.g., Course Coordinator or Teacher)" name="role" value={values.role} onChange={(e) => handleChange(e, index)} /></td>
                </tr>
              </tbody>
            </table>
          ))}
          <button type="button" onClick={addRow} className="btton">
            Add Row
          </button>
          <button type="submit" className="btton">
            Add to Database
          </button>
        </form>
      </div>
    </div>
 );
};

export default Signup;
