import React from 'react';
import './App.css';
import BoxDetails from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
import AboutUs from './components/pages/AboutUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import "@fontsource/source-sans-pro"

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<BoxesHome/>} />
            <Route path='/indiv-search' element={<InsectHome/>} />
            <Route path='/individual' element={<InsectDetails/>} />
            <Route path='/box' element={<BoxDetails/>} />
            <Route path='/add-data' element={<AddData/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/about-us' element={<AboutUs/>} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;