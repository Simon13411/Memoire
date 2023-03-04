import * as React from 'react';
import Navbar from '../Navbar';
import {useNavigate} from 'react-router-dom';

class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
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

    loginUser = (event) => {
        if (this.state.username === 'test1' && this.state.password === 'test2') {
            this.props.navigate('/admin-pannel')
        }
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
            </form>
        </div>
        </>
    )}
}

export function AuthWNav(props) {
    const navigate = useNavigate()
    return <Authentication navigate={navigate}></Authentication>
}

export default Authentication;