import React from 'react';
import '../../App.css';
import BoxesHome from './BoxesHome';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Selection from '../Selection';

function InsectHome() {
    return (
        <>
        <Navbar />
        
        <Selection> </Selection>
        InsectPage
        </>
    )
}

export default InsectHome;