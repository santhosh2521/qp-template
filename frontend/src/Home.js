import React from 'react'
import { Link } from "react-router-dom"; 
import { Teacher } from './Teacher';
import { Coordinator } from './Coordinator';
import Modal from 'react-modal'
import { useState } from 'react';
import './Popup.css'
import './home.css'


export const Home = () => {
   
 const [modalIsopen,setmodalIsopen]=useState(false);

  return (
    
    <div >
      <button  onClick={()=>setmodalIsopen(true)} class='buttonh'>QP Template</button>
      <Modal class="modal" isOpen={modalIsopen} 
        style={{content: {
      top: '40%', bottom: '40%', right:'10%',left:'10%', }}}>
        <p>You Are:</p>
      <Link to={'/coursecoordinator'}><button class="popupbtn">Course Coordinator</button></Link>
       <Link to={'/teacher'} ><button class="popupbtn">Teacher</button></Link>
       <button class="popupbtn close" onClick={()=> setmodalIsopen(false)}>Close</button>
      </Modal>
        <button class='buttonh'>CIE</button>
        <button class='buttonh'>Attendance</button>
        <div><Link to={'/'}><button className='logout'>Logout</button></Link></div>
    </div>
  )
}