import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
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
    role: "", // New state for the role
 };

 const [formValues, setFormValues] = useState([initialValues]);
 const [errors, setErrors] = useState({});
 const [isSubmit, setIsSubmit] = useState(false);
 const navigate = useNavigate();

 const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormValues = [...formValues];
    updatedFormValues[index][name] = value;
    setFormValues(updatedFormValues);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validation(formValues);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmit(true);
      return; // Stop execution if there are errors
    }

    // Prepare the data to be sent to the backend
    const usersData = formValues.map(values => ({
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      dob: values.dob,
      phoneno: values.phoneno,
      password: values.password,
      role: values.role,
    }));

    try {
      console.log('Form Values:', usersData);
      const response = await axios.post('http://localhost:8081/signup', usersData);
      console.log('Server Response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
    }

    setIsSubmit(true);
 };

 const addRow = () => {
    setFormValues([...formValues, initialValues]);
 };

 return (
    <div>
      <div class="admin">
        <h2 id="login">Admin</h2>
        <form action="" onSubmit={handleSubmit}>
          {formValues.map((values, index) => (
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
                <td><input type="name" placeholder="Enter First name" name='fname' value={values.fname} onChange={(e) => handleChange(e, index)}/></td>
                <td><input type="name" placeholder="Enter Last name" name='lname' value={values.lname} onChange={(e) => handleChange(e, index)}/></td>
                <td><input type="email" placeholder="Enter Email" name='email' value={values.email} onChange={(e) => handleChange(e, index)}/></td>
                <td><input type='date' name='dob' value={values.dob} onChange={(e) => handleChange(e, index)} /></td>
                <td><input type='tel' name='phoneno' value={values.phoneno} onChange={(e) => handleChange(e, index)} /></td>
                <td><input type="password" placeholder="Enter Password" name='password' value={values.password} onChange={(e) => handleChange(e, index)}/></td>
                <td><input type="password" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={(e) => handleChange(e, index)}/></td>
                <td><input type="name" placeholder="Enter Role (e.g., Course Coordinator or Teacher)" name="role" value={values.role} onChange={(e) => handleChange(e, index)}/></td>
               </tr>
             </tbody>
           </table>
          ))}
          <button type="button" onClick={addRow} class="btton">
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