import * as React from 'react';
import Navbar from '../Navbar';
import {useNavigate} from 'react-router-dom';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginstate: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    loginUser = () => {
        this.setState({loginstate: 'Authentication in progress ...'})
        axios.post(`${url}/login`, {
            username: this.state.username,
            password: this.state.password
        })
        .then((res) => {
            if (res.data.success) {
                // Stockage du jeton d'authentification dans un cookie
                Cookies.set('auth_token', res.data.token);
                this.props.Authenticate()

                if (res.data.admin === 1) {
                    this.props.BeAdmin()
                }
                this.props.navigate('/');
            }
        })
        .catch((err) => {
          if (!err.response) {
            this.setState({loginstate: 'An error occurred while logging in'});
          }
          else {
            this.setState({loginstate: 'Wrong username or password'});
          }
        });
    }
      

    onSubmit (event) {
        event.preventDefault()
        this.loginUser()
    }

    render() {
        const { username, password } = this.state
        return(
            <>
            {!this.props.isAuthenticated() ?
                (<>
                <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div>
                    <h1>Login</h1>
                    <form onSubmit={(event) => { this.onSubmit(event) }}>
                        <div>
                            <label htmlFor='username'>
                                Username
                            </label>
                            <div>
                                <input
                                type='text'
                                className='form-control'
                                id='username'
                                name='username'
                                value={username}
                                onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <div>
                                <input 
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'>
                                    Log in
                            </button>
                        </div>
                        <div>
                            {this.state.loginstate}
                        </div>
                    </form>
                </div>
                </>
                ):(
                    this.props.navigate('/')
                )
            }
            </>
    )}
}

export function AuthWNav(props) {
    const navigate = useNavigate()
    return <Authentication navigate={navigate} {... props}></Authentication>
}

export default Authentication;