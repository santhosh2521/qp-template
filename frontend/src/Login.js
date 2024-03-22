import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./LoginValidation";
import validation from "./LoginValidation";
import "./Login.css";


function Login() {
 const [values, setValues] = useState({
    email: '',
    password: '',
 });

 const [errors, setErrors] = useState({});
 const navigate = useNavigate(); // Initialize useNavigate

 const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
  
    if (Object.keys(validationErrors).length !== 0) {
      try {
        console.log('Sending login request with values:', values); 

        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Check the role and redirect accordingly
          if (result.role === 'course coordinator' || result.role === 'Course Coordinator') {
            navigate('/coursecoordhome');
          } else if (result.role === 'teacher') {
            navigate('/teacherhome');
          } else {
            navigate('/home');
          }
        } else {
          setErrors({ password: result.message });
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
 };

 const handleAdminLogin = () => {
    navigate('/admin-login'); // Navigate to AdminLogin.js
 };

 return (
    <div>
      <div class="lg">
        <h2 id="login">Log In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="label" id='logem'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" onChange={handleInput} name="email" />
            <i className='bx bx-envelope'></i>
            <div id="error">{errors.email && <span>{errors.email}</span>}</div>
          </div>
          <div className="label" id='logem'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} />
            <i className='bx bxs-lock-alt' ></i>
            <div id="error">{errors.password && <span>{errors.password}</span>}</div>
          </div>
          <button type="submit" className="button">Login</button>
          <button onClick={() => navigate('/admin-login')}>Admin</button>
        </form>
      </div>
    </div>
 );
}

export default Login;
