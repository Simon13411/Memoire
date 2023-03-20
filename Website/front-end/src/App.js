import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import axios from 'axios'
const url = 'http://localhost:4000'

import BoxDetails from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
import AboutUs from './components/pages/AboutUs';
import Authentication, {AuthWNav} from './components/pages/Authentication';
import AdminPannel from './components/pages/AdminPannel';

class App extends React.Component {

  state = {
    username: '',
    isAuthenticated: false,
  };

  componentDidMount() {
    const authToken = Cookies.get('auth_token');
  
    if (authToken) {
      // Vérification du jeton d'authentification
      axios.post(`${url}/validate-token`, { token: authToken })
        .then((res) => {
          if (res.data.success) {
            const username = res.data.username;
            this.setState({ isAuthenticated: true, username: username});
          }
        })
        .catch((err) => console.log(err))
    }
  }

  isAuthenticated = () => {
    return this.state.isAuthenticated
  }

  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<BoxesHome/>} />
            <Route path='/indiv-search' element={<InsectHome/>} />
            <Route path='/individual' element={<InsectDetails isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/box' element={<BoxDetails isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/add-data' element={<AddData isAuthenticated={this.isAuthenticated}/>} />
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