import * as React from 'react';
import Navbar from '../Navbar';
import {Navigate} from 'react-router-dom';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class AdminPannel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            authToken: '',
            newPassword: '', newPassword2: '',
            newpasswordstate: ''
        };
    }

    componentDidMount() {
        this.setState({authToken: Cookies.get('auth_token')})
    }


    onSubmit (event) {
        event.preventDefault()
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    ModifyPassword = () => {
        if (this.state.newPassword === '') {
            this.setState({newpasswordstate: `Enter a valid value for password`});
        }
        else if (this.state.newPassword2 !== this.state.newPassword) {
            this.setState({newpasswordstate: `The two passwords are not the same`});
        }
        else {
            const username = this.props.getUser()
            axios.post(`${url}/modifypw`, {
                username: username,
                password: this.state.newPassword,
                token: this.state.authToken
            })
            .then((res) => {
                this.setState({newpasswordstate: `Your password has been modified`});
            })
            .catch((err) => {
                if (!err.response) {
                    this.setState({newpasswordstate: "Erreur Serveur - Gateway"});
                }
                else {
                    this.setState({newpasswordstate: err.response.data.error});
                }
            });
        }
    }

    render() {
      return (
        <>
        {this.props.isAuthenticated() ? 
            (
            <>
                <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div className="container">
                    <div className="column">
                    <h3>Modify password</h3>
                    <form onSubmit={(event) => { this.onSubmit(event) }}>
                        <label htmlFor="newpassword">New password:</label>
                        <input type="password" value={this.state.newPassword} onChange={this.handleInputChange} name="newPassword" />
                        <label htmlFor="newpassword2">Confirm password:</label>
                        <input type="password" value={this.state.newPassword2} onChange={this.handleInputChange} name="newPassword2" />
                        <button type="submit" name="newPassword" onClick={this.ModifyPassword}>Modify</button>
                        {this.state.newpasswordstate}
                        <br />
                    </form>
                    </div>
                </div>

            </>
            ) : (
                <Navigate to='/sign-in' />
            )
        }
        </>
    )}
}




export default AdminPannel;