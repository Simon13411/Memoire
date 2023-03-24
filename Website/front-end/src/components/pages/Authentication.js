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
        const value = target.type === 'checkbox' ? target.checked : target.value
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
                this.props.auth()
                if (res.data.admin === 1) {
                    this.props.beadmin()
                }
                this.props.navigate('/');
            }
            else {
                this.setState({loginstate: 'Wrong username or password'});
            }
        })
        .catch((err) => {
          console.log(err);
          this.setState({loginstate: 'An error occurred while logging in'});
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
            {!this.props.isauth() ?
                (<>
                <Navbar />
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
    const isauth = props.isAuthenticated
    const auth = props.Authenticate
    const beadmin = props.BeAdmin
    return <Authentication navigate={navigate} isauth={isauth} auth={auth} beadmin={beadmin}></Authentication>
}

export default Authentication;