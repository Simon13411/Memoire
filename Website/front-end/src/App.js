import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import axios from 'axios'

import BoxDetails from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
import AboutUs from './components/pages/AboutUs';
import Authentication, {AuthWNav} from './components/pages/Authentication';
import AdminPannel from './components/pages/AdminPannel';

const url = 'http://192.168.1.15:4000'

class App extends React.Component {

  state = {
    username: '',
    isAuthenticated: false,
    isLoading: true,
  };

  componentDidMount() {
    const authToken = Cookies.get('auth_token');
  
    if (authToken) {
      // Vérification du jeton d'authentification
      axios.post(`${url}/validate-token`, { token: authToken })
        .then((res) => {
          if (res.data.success) {
            console.log("successfully connected")
            const username = res.data.username;
            this.setState({ isAuthenticated: true, username: username});
          }
        })
        .catch((err) => console.log(err))
        .finally(() => this.setState({isLoading: false}))
    }
    else {
      console.log("Not connected")
      this.setState({isLoading: false})
    }
  }

  isAuthenticated = () => {
    return this.state.isAuthenticated
  }

  isLoading = () => {
    return this.state.isLoading
  }

  Authenticate = () => {
    console.log("Successfully Connected")
    this.setState({isAuthenticated: true})
  }

  render() {
    return (
      <>
      {this.state.isLoading ?
      (<></>
      ):(
        <Router>
          <Routes>
            <Route path='/' element={<BoxesHome/>} />
            <Route path='/indiv-search' element={<InsectHome/>} />
            <Route path='/individual' element={<InsectDetails isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/box/:id' element={<BoxDetails isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/add-data' element={<AddData isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/sign-in' element={<AuthWNav Authenticate={this.Authenticate}/>} />
            <Route path='/admin-pannel' element={<AdminPannel isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/about-us' element={<AboutUs/>} />
          </Routes>
        </Router>
      )}
      </>
    )
  }
}

export default App;