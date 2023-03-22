import * as React from 'react';
import Navbar from '../Navbar';
import {Navigate} from 'react-router-dom';
import './AdminPannel.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

    //Fields Change Handlers
    handleOrderChange = (event) => {
        this.setState({order: event.target.value})
    }

    handlesubOrderChange = (event) => {
        this.setState({subOrder: event.target.value})
    }

    handleFamilyChange = (event) => {
        this.setState({family: event.target.value})
    }

    handlesubFamilyChange = (event) => {
        this.setState({subFamily: event.target.value})
    }

    handleGenusChange = (event) => {
        this.setState({genus: event.target.value})
    }

    handlesubGenusChange = (event) => {
        this.setState({subGenus: event.target.value})
    }

    handleSpeciesChange = (event) => {
        this.setState({species: event.target.value})
    }

    handlesubSpeciesChange = (event) => {
        this.setState({subSpecies: event.target.value})
    }

    handleTribuChange = (event) => {
        this.setState({tribu: event.target.value})
    }

    handleAddedUserChange = (event) => {
        this.setState({usernameToAdd: event.target.value})
    }

    handleAddedPWChange = (event) => {
        this.setState({passwordToAdd: event.target.value})
    }

    handleModifiedUserChange = (event) => {
        this.setState({usernameToModify: event.target.value})
    }

    handleAddedPWChange = (event) => {
        this.setState({newPassword: event.target.value})
    }

    //HTTP Requests

    getUsers = () => {
        axios.post(`${url}/get-users`)
        .then((res) => {
            this.setState({users: res.data.rows});
        })
    }

    handleAddOrder = () => {
        axios.post(`${url}/add-order/:name`, {
            name: this.state.order
        })
        .then((res) => {
            this.setState({orderstate: 'Problem'});
        })
    }

    handleAddsubOrder = () => {
        axios.post(`${url}/add-suborder/:name`, {
            name: this.state.subOrder
        })
        .then((res) => {
            this.setState({suborderstate: 'Problem'});
        })
    }

    handleAddFamily = () => {
        axios.post(`${url}/add-family/:name`, {
            name: this.state.family
        })
        .then((res) => {
            this.setState({familystate: 'Problem'});
        })
    }

    handleAddsubFamily = () => {
        axios.post(`${url}/add-subfamily/:name`, {
            name: this.state.subFamily
        })
        .then((res) => {
            this.setState({subfamilystate: 'Problem'});
        })
    }

    handleAddGenus = () => {
        axios.post(`${url}/add-genus/:name`, {
            name: this.state.genus
        })
        .then((res) => {
            this.setState({genusstate: 'Problem'});
        })
    }

    handleAddsubGenus = () => {
        axios.post(`${url}/add-subgenus/:name`, {
            name: this.state.subGenus
        })
        .then((res) => {
            this.setState({subgenusstate: 'Problem'});
        })
    }

    handleAddSPecies = () => {
        axios.post(`${url}/add-species/:name`, {
            name: this.state.species
        })
        .then((res) => {
            this.setState({speciesstate: 'Problem'});
        })
    }

    handleAddsubSpecies = () => {
        axios.post(`${url}/add-subspecies/:name`, {
            name: this.state.subSpecies
        })
        .then((res) => {
            this.setState({subspeciesstate: 'Problem'});
        })
    }

    handleAddTribu = () => {
        axios.post(`${url}/add-tribu/:name`, {
            name: this.state.tribu
        })
        .then((res) => {
            this.setState({tribustate: 'Problem'});
        })
    }

    handleAddUser = () => {
        axios.post(`${url}/sign-up/:user/:pass/:admin`, {
            username: this.state.usernameToAdd,
            password: this.state.passwordToAdd,
            admin: this.state.adminToAdd
        })
        .then((res) => {
            this.setState({useraddstate: `User ${usernameToAdd} added`});
        })
        .catch((err) => {
          this.setState({useraddstate: 'An error occurred while adding user'});
        });
    }

    handleModifyPassword = () => {
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
        {this.props.isAuthenticated() ? 
            (
            <>
                <Navbar />
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
                  <form>
                  <label htmlFor="newusername">Username:</label>
                    <input type="text" id="addusern" name="addusern" />
                    <br />
        
                    <label htmlFor="newpassword">Password:</label>
                    <input type="text" id="addpw" name="addpw" />
                    <br />
                    <button type="submit">Ajouter</button>
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