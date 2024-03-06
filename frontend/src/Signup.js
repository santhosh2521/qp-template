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

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(formValues));
    setIsSubmit(true);

    if (formValues.password !== formValues.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
    } else {
      try {
        // Make an HTTP POST request to your Express API
        console.log('Form Values:', formValues);
        const response = await axios.post('http://localhost:8081/signup', formValues);

        // Handle the response, e.g., show a success message
        console.log('Server Response:', response.data);
        navigate('/');
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error during signup:', error);
      }
    }

    setIsSubmit(true);
  };

  return (
    <div>
      <div className="wrapper">
        <h2 id="login">Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="label">
          <label htmlFor="fname">First Name</label>
                <input type="name" placeholder="Enter First name" name='fname' value={formValues.fname} onChange={handleChange}/>
                <label htmlFor="lname">Last Name</label>
                <input type="name" placeholder="Enter Last name" name='lname' value={formValues.lname} onChange={handleChange}/>
                <div id="error">{errors.name && <span>{errors.name}</span>}</div>
                  </div>
                    <div class="label">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email" name='email' value={formValues.email} onChange={handleChange}/>
                    <div id="error">{errors.email && <span>{errors.email}</span>}</div>
                    </div>
                    <div>
                      <label htmlFor='dob'>Date of Birth</label>
                      <input type='date' name='dob' value={formValues.dob} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor='phoneno'>Phone Number</label>
                      <input type='tel' name='phoneno' value={formValues.phoneno} onChange={handleChange} />
                    </div>
                    <div class="label">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name='password' value={formValues.password} onChange={handleChange}/>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange}/>
                    <div id="error">{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</div>
            <label htmlFor="role">Role</label>
            <input
              type="name" placeholder="Enter Role (e.g., Course Coordinator or Teacher)" name="role"
              value={formValues.role}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button">
            Sign Up
          </button>
          <Link to="/">
            <button type="button" className="button">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;