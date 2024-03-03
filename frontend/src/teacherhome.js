import React from 'react'
import { Link } from "react-router-dom"; 
import { Teacher } from './Teacher';
import { Coordinator } from './Coordinator';
import { useState } from 'react';
import './Popup.css'
import './home.css'


export const Teacherhome = () => {
   

  return (
    
    <div >
      <Link to={'/teacher'}><button class='buttonh'>QP Template</button></Link>
        <button class='buttonh'>CIE</button>
        <button class='buttonh'>Attendance</button>
        <div><Link to={'/'}><button className='logout'>Logout</button></Link></div>
    </div>
  )
}