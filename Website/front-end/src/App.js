import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import axios from 'axios'

import {BoxDetailsWSP} from './pages/BoxDetails';
import {InsectDetailsWSP} from './pages/InsectDetails';
import BoxesHome from './pages/BoxesHome';
import InsectHome from './pages/InsectHome';
import AddData from './pages/AddData';
import AboutUs from './pages/AboutUs';
import {AuthWNav} from './pages/Authentication';
import AdminPannel from './pages/AdminPannel';
import SettingUser from './pages/SettingUser';

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
                axios.post(`${url}/adminright`, { username: username })
                    .then((res) => {
                        if (res.data.success) {
                            this.setState({ isAuthenticated: true, username: username, isAdmin: true, isLoading: false}, console.log("Admin Right Granted"));
                        }
                        else {
                            this.setState({ isAuthenticated: true, username: username, isAdmin: false, isLoading: false}, console.log("Successfully Connected"));
                        }
                    })
                    .catch((err) => {
                        this.setState({ isAuthenticated: true, username: username, isAdmin: false, isLoading: false}, console.log("Successfully Connected"));
                    })
                }
            })
            .catch((err) => {
                this.setState({isLoading: false}, console.log("Not connected"))
            })
        }
        else {
            this.setState({isLoading: false}, console.log("Not connected"))
        }
    }

    isAuthenticated = () => {
        if (!this.isLoading()) {
            return this.state.isAuthenticated
        }
    }

    isAdmin = () => {
        if (!this.isLoading()) {
            return this.state.isAdmin
        }
    }

    getUser = () => {
        if (!this.isLoading()) {
            return this.state.username
        }
    }

    isLoading = () => {
        return this.state.isLoading
    }

    Authenticate = () => {
        this.setState({isAuthenticated: true}, console.log("Successfully Connected"))
    }

    BeAdmin = () => {
        this.setState({isAdmin: true}, console.log("Admin Right Granted"))
    }

    Logout = () => {
        Cookies.remove('auth_token')
        this.setState({isAdmin: false, isAuthenticated: false, username: ''}, console.log("Logged Out"))
    }

    render() {
        return (
        <>
        {this.state.isLoading ?
            (
                <></>
            ):(
                <Router>
                <Routes>
                    <Route path='/' element={<BoxesHome isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/box-search' element={<BoxesHome isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/individual-search' element={<InsectHome isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/individual' element={<InsectDetailsWSP isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/box' element={<BoxDetailsWSP isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/add-data' element={<AddData isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/sign-in' element={<AuthWNav Authenticate={this.Authenticate} BeAdmin={this.BeAdmin} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/admin-pannel' element={<AdminPannel getUser={this.getUser} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/about-us' element={<AboutUs isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                    <Route path='/usersettings' element={<SettingUser getUser={this.getUser} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} Logout={this.Logout}/>} />
                </Routes>
                </Router>
            )
        }
        </>
        )
    }
}

export default App;