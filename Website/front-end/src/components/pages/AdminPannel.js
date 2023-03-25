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
        order: '', orderstate: '',
        subOrder: '', suborderstate: '',
        family: '', familystate: '',
        subFamily: '', subfamilystate: '',
        genus: '', genusstate: '',
        subGenus: '', subgenusstate: '',
        species: '', speciesstate: '',
        subSpecies: '', subspeciesstate: '',
        tribu: '', tribustate: '',
        //Delete Attribute
        orderlist: [], order2: '', order2state: '',
        suborderlist: [], suborder2: '', suborder2state: '',
        familylist: [], family2: '', family2state: '',
        subfamilylist: [], subfamily2: '', subfamily2state: '',
        genuslist: [], genus2: '', genus2state: '',
        subgenuslist: [], subgenus2: '', subgenus2state: '',
        specieslist: [], species2: '', species2state: '',
        subspecieslist: [], subspecies2: '', subspecies2state: '',
        tribulist: [], tribu2: '', tribu2state: '',
        //AddUser
        usernameToAdd: '',
        passwordToAdd: '',
        adminToAdd: '0',     //Admin Right for UserToAdd ?
        useraddstate: '',
        //ModifyUser
        usernameToModify: '',
        newPassword: '',
        users: [],
        usermodifstate: '',
        //GiveOrDeleteAdminRight
        usernameToAdmin: '',
        adminRight: '0',
        userrightstate: '',
        //Token
        authToken: ''
      };
    }

    componentDidMount() {
        this.setState({authToken: Cookies.get('auth_token')})
        {this.getUsers()}
        {this.get_selection()}
      }

    onSubmit (event) {
        event.preventDefault()
    }

    get_selection() {
        axios.get(`${url}/get_selectiono`, {
          params:
          {so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({orderlist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionso`, {
          params:
          {o: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({suborderlist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectiong`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({genuslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionsg`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({subgenuslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionf`, {
          params:
          {o: 'NULL', so: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({familylist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionsf`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({subfamilylist: res.data.rows})
        })
    
        axios.get(`${url}/get_selections`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({specieslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionss`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL'}})
        .then((res) => {
            this.setState({subspecieslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectiont`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
        .then((res) => {
            this.setState({tribulist: res.data.rows})
        })
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
        axios.get(`${url}/get-users`)
        .then((res) => {
            this.setState({users: res.data.rows});
        })
    }

    AddOrder = () => {
        axios.post(`${url}/add-order`, {
            name: this.state.order,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({orderstate: 'Problem'});
        })
    }

    AddsubOrder = () => {
        axios.post(`${url}/add-suborder`, {
            name: this.state.subOrder,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({suborderstate: 'Problem'});
        })
    }

    AddFamily = () => {
        axios.post(`${url}/add-family`, {
            name: this.state.family,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({familystate: 'Problem'});
        })
    }

    AddsubFamily = () => {
        axios.post(`${url}/add-subfamily`, {
            name: this.state.subFamily,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({subfamilystate: 'Problem'});
        })
    }

    AddGenus = () => {
        axios.post(`${url}/add-genus`, {
            name: this.state.genus,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({genusstate: 'Problem'});
        })
    }

    AddsubGenus = () => {
        axios.post(`${url}/add-subgenus`, {
            name: this.state.subGenus,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({subgenusstate: 'Problem'});
        })
    }

    AddSpecies = () => {
        axios.post(`${url}/add-species`, {
            name: this.state.species,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({speciesstate: 'Problem'});
        })
    }

    AddsubSpecies = () => {
        axios.post(`${url}/add-subspecies`, {
            name: this.state.subSpecies,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({subspeciesstate: 'Problem'});
        })
    }

    AddTribu = () => {
        axios.post(`${url}/add-tribu`, {
            name: this.state.tribu,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({tribustate: 'Problem'});
        })
    }

    AddUser = () => {
        axios.post(`${url}/signup`, {
            username: this.state.usernameToAdd,
            password: this.state.passwordToAdd,
            role: this.state.adminToAdd,
            token: this.state.authToken
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
        axios.post(`${url}/modifypw`, {
            username: this.state.usernameToModify,
            password: this.state.newPassword,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({usermodifstate: `${usernameToModify}'s password modified`});
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

    Modifyright = () => {
        axios.post(`${url}/modifyright`, {
            username: this.state.usernameToAdmin,
            role: this.state.adminRight,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({userrightstate: `${usernameToAdmin}'s rights modified`});
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

    render() {
      return (
        <>
        {this.props.isAdmin() ? 
            (
            <>
                <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div className="container">
                <div className="column">
                  <h3>Ajouter des classification</h3>
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
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
                  <h3>Supprimer des classification</h3>
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Order</InputLabel>
                        <Select
                        labelId="order-label"
                        id="order-select"
                        value={this.state.order2}
                        label="Order"
                        onChange={this.handleInputChange}
                        name="order2"
                        >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddOrder}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">SubOrder</InputLabel>
                        <Select
                        labelId="suborder2-label"
                        id="suborder2-select"
                        value={this.state.suborder2}
                        label="subOrder2"
                        onChange={this.handleInputChange}
                        name="suborder2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddsubOrder}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Family</InputLabel>
                        <Select
                        labelId="family2-label"
                        id="family2-select"
                        value={this.state.family2}
                        label="family2"
                        onChange={this.handleInputChange}
                        name="family2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddFamily}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">SubFamily</InputLabel>
                        <Select
                        labelId="subfamily2-label"
                        id="subfamily2-select"
                        value={this.state.subfamily2}
                        label="subfamily2"
                        onChange={this.handleInputChange}
                        name="subfamily2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddsubFamily}>Supprimer</button>
                    <br />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Genus</InputLabel>
                        <Select
                        labelId="genus2-label"
                        id="genus2-select"
                        value={this.state.genus2}
                        label="genus2"
                        onChange={this.handleInputChange}
                        name="genus2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddGenus}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">SubGenus</InputLabel>
                        <Select
                        labelId="subgenus2-label"
                        id="subgenus2-select"
                        value={this.state.subgenus2}
                        label="subgenus2"
                        onChange={this.handleInputChange}
                        name="subgenus2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddsubGenus}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Species</InputLabel>
                        <Select
                        labelId="species2-label"
                        id="species2-select"
                        value={this.state.species2}
                        label="species2"
                        onChange={this.handleInputChange}
                        name="species2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddSpecies}>Supprimer</button>
                    <br />
        
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">SubSpecies</InputLabel>
                        <Select
                        labelId="subspecies2-label"
                        id="subspecies2-select"
                        value={this.state.subspecies2}
                        label="subspecies2"
                        onChange={this.handleInputChange}
                        name="subspecies2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddsubSpecies}>Supprimer</button>
                    <br />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Tribu</InputLabel>
                        <Select
                        labelId="tribu2-label"
                        id="tribu2-select"
                        value={this.state.tribu2}
                        label="tribu2"
                        onChange={this.handleInputChange}
                        name="tribu2"
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" onClick={this.AddTribu}>Supprimer</button>
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
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                  <label htmlFor="usernameToModify">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="usernameToModify"
                        id="usernameToModify"
                        value={this.state.usernameToModify}
                        label="usernameToModify"
                        onChange={this.handleInputChange}
                        name='usernameToModify'
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.users.map(user => (
                            <>
                            {this.props.getUser() !== user.username ?
                                (
                                <MenuItem key={user.username} value={user.username}>
                                    {user.username}
                                </MenuItem>
                                ) : (
                                    <></>
                                )
                            }
                            </>
                        ))}
                        </Select>
                    </FormControl>
                    <br />
        
                    <label htmlFor="newpassword">New password:</label>
                    <input type="text" value={this.state.newPassword} onChange={this.handleInputChange} name="newPassword" />
                    <br />
                    <button type="submit" onClick={this.ModifyPassword}>Modifier</button>
                </form>
                </div>
                <div className="column">
                  <h3>Accès Administrateur</h3>
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                  <label htmlFor="usernameToAdmin">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            labelId="usernameToAdmin"
                            id="usernameToAdmin"
                            value={this.state.usernameToAdmin}
                            label="usernameToAdmin"
                            onChange={this.handleInputChange}
                            name='usernameToAdmin'
                        >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.users.map(user => (
                            <>
                            {this.props.getUser() !== user.username ?
                                (
                                <MenuItem key={user.username} value={user.username}>
                                    {user.username}
                                </MenuItem>
                                ) : (
                                    <></>
                                )
                            }
                            </>
                        ))}
                        </Select>
                    </FormControl>
                    <br />
        
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={this.state.adminRight === '1'} onChange={this.handleCheck} name="adminRight"/>} label='adminacces' />
                    </FormGroup>
                    <button type="submit" onClick={this.Modifyright}>Modifier</button>
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