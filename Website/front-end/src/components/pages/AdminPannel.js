import * as React from 'react';
import Navbar from '../Navbar';
import {Navigate} from 'react-router-dom';

import Cookies from 'js-cookie';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class AdminPannel extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        //Add Attribute
        order: '',
        orderstate: '',
        subOrder: '',
        suborderstate: '',
        family: '',
        familystate: '',
        subFamily: '',
        subfamilystate: '',
        genus: '',
        genusstate: '',
        subGenus: '',
        subgenusstate: '',
        species: '',
        speciesstate: '',
        subSpecies: '',
        subspeciesstate: '',
        tribu: '',
        tribustate: '',
        //AddUser
        usernameToAdd: '',
        passwordToAdd: '',
        adminToAdd: '0',     //Admin Right for UserToAdd ?
        useraddstate: '',
        //ModifyUser
        usernameToModify: '',
        newPassword: '',
        users: [],
        //GiveOrDeleteAdminRight
        adminRight: '0',
      };
    }

    onSubmit (event) {
        event.preventDefault()
    }

    //Fields Change Handlers
    handleCheck = (event) => {
        const target = event.target;
        const value = target.checked ? '1' : '0'; //if crossed 1 if not 0
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    //HTTP Requests

    getUsers = () => {
        axios.post(`${url}/get-users`)
        .then((res) => {
            this.setState({users: res.data.rows});
        })
    }

    AddOrder = () => {
        axios.post(`${url}/add-order/:name`, {
            name: this.state.order
        })
        .then((res) => {
            this.setState({orderstate: 'Problem'});
        })
    }

    AddsubOrder = () => {
        axios.post(`${url}/add-suborder/:name`, {
            name: this.state.subOrder
        })
        .then((res) => {
            this.setState({suborderstate: 'Problem'});
        })
    }

    AddFamily = () => {
        axios.post(`${url}/add-family/:name`, {
            name: this.state.family
        })
        .then((res) => {
            this.setState({familystate: 'Problem'});
        })
    }

    AddsubFamily = () => {
        axios.post(`${url}/add-subfamily/:name`, {
            name: this.state.subFamily
        })
        .then((res) => {
            this.setState({subfamilystate: 'Problem'});
        })
    }

    AddGenus = () => {
        axios.post(`${url}/add-genus/:name`, {
            name: this.state.genus
        })
        .then((res) => {
            this.setState({genusstate: 'Problem'});
        })
    }

    AddsubGenus = () => {
        axios.post(`${url}/add-subgenus/:name`, {
            name: this.state.subGenus
        })
        .then((res) => {
            this.setState({subgenusstate: 'Problem'});
        })
    }

    AddSPecies = () => {
        axios.post(`${url}/add-species/:name`, {
            name: this.state.species
        })
        .then((res) => {
            this.setState({speciesstate: 'Problem'});
        })
    }

    AddsubSpecies = () => {
        axios.post(`${url}/add-subspecies/:name`, {
            name: this.state.subSpecies
        })
        .then((res) => {
            this.setState({subspeciesstate: 'Problem'});
        })
    }

    AddTribu = () => {
        axios.post(`${url}/add-tribu/:name`, {
            name: this.state.tribu
        })
        .then((res) => {
            this.setState({tribustate: 'Problem'});
        })
    }

    AddUser = () => {
        const authToken = Cookies.get('auth_token');
        axios.post(`${url}/signup`, {
            username: this.state.usernameToAdd,
            password: this.state.passwordToAdd,
            role: this.state.adminToAdd,
            token: authToken
        })
        .then((res) => {
            console.log(res)
            this.setState({useraddstate: `User ${this.state.usernameToAdd} added`, usernameToAdd: '', passwordToAdd: '', adminToAdd: '0'});
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({useraddstate: "Erreur Serveur"});
            }
            else {
                this.setState({useraddstate: err.response.data.error});
            }
        });
    }

    ModifyPassword = () => {
        axios.post(`${url}/modify/:user/:pass`, {
            username: this.state.usernameToModify,
            password: this.state.newPassword
        })
        .then((res) => {
            this.setState({useraddstate: `User ${usernameToAdd} added`});
        })
        .catch((err) => {
          this.setState({useraddstate: 'An error occurred while adding user'});
        });
    }

    render() {
      return (
        <>
        {this.props.isAdmin() ? 
            (
            <>
                <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div className="container">
                <div className="column">
                  <h3>Ajouter des données</h3>
                  <form>
                    <label htmlFor="order">Order:</label>
                    <input type="text" id="order" name="order" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="suborder">SubOrder:</label>
                    <input type="text" id="suborder" name="suborder" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="family">Family:</label>
                    <input type="text" id="family" name="family" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="subfamily">SubFamily:</label>
                    <input type="text" id="subfamily" name="subfamily" />
                    <button type="submit">Ajouter</button>
                    <br />

                    <label htmlFor="genus">Genus:</label>
                    <input type="text" id="genus" name="genus" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="subgenus">SubGenus:</label>
                    <input type="text" id="subgenus" name="subgenus" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="species">Species:</label>
                    <input type="text" id="species" name="species" />
                    <button type="submit">Ajouter</button>
                    <br />
        
                    <label htmlFor="subspecies">SubSpecies:</label>
                    <input type="text" id="subspecies" name="subspecies" />
                    <button type="submit">Ajouter</button>
                    <br />

                    <label htmlFor="subfamily">Tribu:</label>
                    <input type="text" id="tribu" name="tribu" />
                    <button type="submit">Ajouter</button>
                  </form>
                </div>
        
                <div className="column">
                  <h3>Modifier données</h3>
                  <button type="submit">Soumettre</button>
                </div>
        
                <div className="column">
                    <h3>Ajouter un utilisateur</h3>
                    <form onSubmit={(event) => { this.onSubmit(event) }}>
                        <label htmlFor="newusername">Username:</label>
                        <input type="text" value={this.state.usernameToAdd} onChange={this.handleInputChange} name="usernameToAdd"/>
                        <br />
            
                        <label htmlFor="newpassword">Password:</label>
                        <input type="text" value={this.state.passwordToAdd} onChange={this.handleInputChange} name="passwordToAdd"/>
                        <br />

                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={this.state.adminToAdd === '1'} onChange={this.handleCheck} name="adminToAdd"/>} label='adminacces' />
                        </FormGroup>
                        <button type="submit" onClick={this.AddUser}>Ajouter</button>
                        <div>{this.state.useraddstate}</div>
                    </form>
                </div>
                <div className="column">
                  <h3>Modifier un utilisateur</h3>
                  <form>
                  <label htmlFor="Existing username">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="existingu-label"
                        id="existingu-select"
                        value={this.state.order}
                        label="Existingu"
                        onChange={this.OChange}
                        >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='T'>
                            <em>Test</em>
                        </MenuItem>
                        </Select>
                    </FormControl>
                    <br />
        
                    <label htmlFor="newpassword">New password:</label>
                    <input type="text" id="modifpw" name="modifpw" />
                    <br />
                    <button type="submit">Ajouter</button>
                </form>
                </div>
                <div className="column">
                  <h3>Accès Administrateur</h3>
                  <form>
                  <label htmlFor="Existing username">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="existingu-label"
                        id="existingu-select"
                        value={this.state.order}
                        label="Existingu"
                        onChange={this.OChange}
                        >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='T'>
                            <em>Test</em>
                        </MenuItem>
                        </Select>
                    </FormControl>
                    <br />
        
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label='adminacces' />
                    </FormGroup>
                    <button type="submit">Soumettre</button>
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