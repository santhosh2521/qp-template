import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css"; // Ensure you have a CSS file for styling

function AdminLogin() {
 const [adminPassword, setAdminPassword] = useState('');
 const navigate = useNavigate();

 const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
 };

 const handleAdminSubmit = (event) => {
    event.preventDefault();
    if (adminPassword === 'admin123') {
      console.log('Admin login successful');
      navigate('/signup'); // Ensure this is the correct path to Signup.js
    } else {
      console.log('Incorrect admin password');
      // Optionally, show an error message or prompt for re-entry
    }
 };

 return (
<div class="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleAdminSubmit}>
          <label htmlFor="password">Enter Admin Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={adminPassword}
            onChange={handleAdminPasswordChange} />
          <button type="submit">Proceed</button>
        </form>
      </div>
 );
}

export default AdminLogin;
