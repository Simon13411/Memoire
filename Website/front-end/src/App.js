import React from 'react';
import './App.css';
import BoxDetails from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
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
            <Route path='/IndividualSearch' element={<InsectHome/>} />
            <Route path='/Individual' element={<BoxDetails/>} />
            <Route path='/Box' element={<InsectDetails/>} />
            <Route path='/AddData' element={<AddData/>} />
            <Route path='/sign-up' element={<SignUp/>} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;