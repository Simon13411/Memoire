import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import axios from 'axios'

import {BoxDetailsW} from './components/pages/BoxDetails';
import InsectDetails from './components/pages/InsectDetails';
import BoxesHome from './components/pages/BoxesHome';
import InsectHome from './components/pages/InsectHome';
import AddData from './components/pages/AddData';
import AboutUs from './components/pages/AboutUs';
import {AuthWNav} from './components/pages/Authentication';
import AdminPannel from './components/pages/AdminPannel';

const url = process.env.REACT_APP_IP

class App extends React.Component {

  state = {
    username: '',
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  };

  componentDidMount() {
    const authToken = Cookies.get('auth_token');
  
    if (authToken) {
      // Vérification du jeton d'authentification
      axios.post(`${url}/validate-token`, { token: authToken })
        .then((res) => {
          if (res.data.success) {
            const username = res.data.username;
            axios.post(`${url}/validate-token`, { token: authToken })
              .then((res) => {
                if (res.data.rows.role === 1) {
                  this.setState({ isAuthenticated: true, username: username, isAdmin: true});
                }
                else {
                  this.setState({ isAuthenticated: true, username: username, isAdmin: false});
                }
                console.log("successfully connected")
              })
              .catch((err) => console.log(err))
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

  isAdmin = () => {
    return this.state.isAdmin
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
            <Route path='/box-search' element={<BoxesHome/>} />
            <Route path='/individual-search' element={<InsectHome/>} />
            <Route path='/individual' element={<InsectDetails isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/box' element={<BoxDetailsW isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/add-data' element={<AddData isAuthenticated={this.isAuthenticated}/>} />
            <Route path='/sign-in' element={<AuthWNav Authenticate={this.Authenticate}/>} />
            <Route path='/admin-pannel' element={<AdminPannel isAdmin={this.isAdmin}/>} />
            <Route path='/about-us' element={<AboutUs/>} />
          </Routes>
        </Router>
      )}
      </>
    )
  }
}

export default App;