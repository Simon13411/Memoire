import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import BoxDetails from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
import AboutUs from './components/pages/AboutUs';
import Authentication, {AuthWNav} from './components/pages/Authentication';
import AdminPannel from './components/pages/AdminPannel';

class App extends React.Component {
  getAccessToken = () => {
    Cookies.get('gc_access_token')
  }

  getRefreshToken = () => {
    Cookies.get('gc_refresh_token')
  }

  isAuthenticated = () => {
    !!this.getAccessToken()
  }

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
            <Route path='/sign-in' element={<AuthWNav/>} />
            <Route path='/admin-pannel' element={<AdminPannel isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/about-us' element={<AboutUs/>} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;