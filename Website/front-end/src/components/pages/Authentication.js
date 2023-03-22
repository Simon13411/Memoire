import * as React from 'react';
import Navbar from '../Navbar';
import {useNavigate} from 'react-router-dom';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = 'http://192.168.1.15:4000'

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
        axios.post(`${url}/login`, {
            username: this.state.username,
            password: this.state.password
        })
        .then((res) => {
            if (res.data.success) {
                // Stockage du jeton d'authentification dans un cookie
                Cookies.set('auth_token', res.data.token);
                this.props.auth()
                this.props.navigate('/admin-pannel');
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
                    <div className='col-md-10'>
                        <input className='form-control'
                        type='password'
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
    )}
}

export function AuthWNav(props) {
    const navigate = useNavigate()
    const auth = props.Authenticate
    return <Authentication navigate={navigate} auth={auth}></Authentication>
}

export default Authentication;