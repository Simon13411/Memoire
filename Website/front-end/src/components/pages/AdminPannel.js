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
        addattrstate: '',
        order: '',
        subOrder: '',
        family: '',
        subFamily: '',
        genus: '',
        subGenus: '',
        species: '',
        subSpecies: '',
        tribu: '',
        //Delete Attribute
        deleteattrstate: '',
        orderlist: [], order2: '',
        suborderlist: [], suborder2: '',
        familylist: [], family2: '',
        subfamilylist: [], subfamily2: '',
        genuslist: [], genus2: '', genus2state: '',
        subgenuslist: [], subgenus2: '',
        specieslist: [], species2: '', 
        subspecieslist: [], subspecies2: '',
        tribulist: [], tribu2: '',
        //AddUser
        usernameToAdd: '',
        passwordToAdd: '', passwordToAdd2 : '',
        adminToAdd: '0',     //Admin Right for UserToAdd ?
        useraddstate: '',
        //ModifyUser
        usernametomodify: '',
        newPassword: '', newPassword2: '',
        users: [],
        usermodifstate: '',
        //GiveOrDeleteAdminRight
        usernametoadmin: '',
        adminRight: '0',
        userrightstate: '',
        //AddCollection
        newcollection: '',
        addcollectionstate: '',
        //ModifyCollection
        collectionlist: [],
        modifiedcollection: 'NULL',
        modifiedcollection2: '',
        modifycollectionstate: '',
        //AddLoaner
        newloanername: '',
        newloanerphone: '',
        newloanermail: '',
        newloanerstate: '',
        //Modifyloaner
        loanerlist: [],
        modifiedloanername: '',
        modifiedloanername2: '',
        modifiedloanermail: '',
        modifiedloanerphone: '',
        modifiedloanerstate: '',
        //Token
        authToken: ''
      };
    }

    componentDidMount() {
        this.setState({authToken: Cookies.get('auth_token')})
        this.getUsers()
        this.get_selection()
        this.getCollections()
        this.getLoaners()
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

    getLoaners = () => {
        axios.get(`${url}/get_loaners`)
        .then((res) => {
            this.setState({loanerlist: res.data.rows})
        })
    }

    getCollections = () => {
        axios.get(`${url}/get_collections`)
            .then((res) => {
                this.setState({collectionlist: res.data.rows})
        })
      }

    getLoanerInfo = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        if (value !== '') {
            this.setState({
                [name]: value
            }, this.getLoanerInfoHelper
            )
        }
        else {
            this.setState({[name]: ''})
        }
    }

    getLoanerInfoHelper = () => {
        axios.get(`${url}/get_loanerinfo/${this.state.modifiedloanername}`)
        .then((res) => {
            this.setState({
                modifiedloanername2: res.data.rows[0].name,
                modifiedloanerphone: res.data.rows[0].phone,
                modifiedloanermail: res.data.rows[0].mail})
        })
        .catch((err) => {
            //Nothing
        })
    }


    AddAttribute = (event) => {
        const target = event.target
        const name = target.name
        const attribute = this.state[name]
        axios.post(`${url}/add-attribute/${name}`, {
            attribute: attribute,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({addattrstate: `${attribute} added to ${name} db`}, this.get_selection);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({addattrstate: "Erreur Serveur - Gateway"});
            }
            else {
                this.setState({addattrstate: err.response.data.error});
            }
        });
    }

    DeleteAttribute = (event) => {
        const target = event.target
        const name = target.name
        const attribute = this.state[name]
        axios.post(`${url}/delete-attribute/${name}`, {
            attribute: attribute,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({deleteattrstate: `${attribute} deleted from ${name} db`}, this.get_selection);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({deleteattrstate: "Erreur serveur - Gateway"});
            }
            else {
                this.setState({deleteattrstate: err.response.data.error});
            }
        });
    }


    AddUser = () => {
        if (this.state.usernameToAdd === 'NULL' || this.state.usernameToAdd === '') {
            this.setState({useraddstate: `Invalid name`});
        }
        else if (this.state.passwordToAdd === '') {
            this.setState({useraddstate: `Enter a valid value for password`})
        }
        else if (this.state.passwordToAdd2 !== this.state.passwordToAdd) {
            this.setState({useraddstate: `The two passwords are not the same`});
        }
        else {
            axios.post(`${url}/signup`, {
                username: this.state.usernameToAdd,
                password: this.state.passwordToAdd,
                role: this.state.adminToAdd,
                token: this.state.authToken
            })
            .then((res) => {
                console.log(res)
                this.setState({useraddstate: `User ${this.state.usernameToAdd} added`, usernameToAdd: '', passwordToAdd: '', passwordToAdd2: '', adminToAdd: '0'}, this.getUsers);
            })
            .catch((err) => {
                if (!err.response) {
                    this.setState({useraddstate: "Erreur Serveur - Gateway"});
                }
                else {
                    this.setState({useraddstate: err.response.data.error});
                }
            });
        }
    }

    ModifyPassword = () => {
        if (this.state.usernametomodify === 'NULL' || this.state.usernametomodify === '') {
            this.setState({usermodifstate: `Invalid user`});
        }
        else if (this.state.newPassword === '') {
            this.setState({usermodifstate: `Enter a valid value for password`});
        }
        else if (this.state.newPassword2 !== this.state.newPassword) {
            this.setState({usermodifstate: `The two passwords are not the same`});
        }
        else {
            axios.post(`${url}/modifypw`, {
                username: this.state.usernametomodify,
                password: this.state.newPassword,
                token: this.state.authToken
            })
            .then((res) => {
                this.setState({usermodifstate: `${this.state.usernametomodify}'s password modified`});
            })
            .catch((err) => {
                if (!err.response) {
                    this.setState({usermodifstate: "Erreur Serveur - Gateway"});
                }
                else {
                    this.setState({usermodifstate: err.response.data.error});
                }
            });
        }
    }

    Modifyright = () => {
        if (this.props.getUser() === this.state.usernametoadmin) {
            this.setState({userrightstate: `U can't modify your own rights`});
        }
        else if (this.state.usernametoadmin === 'NULL' || this.state.usernametoadmin === '') {
            this.setState({userrightstate: `Invalid user`});
        }
        else {
            axios.post(`${url}/modifyright`, {
                username: this.state.usernametoadmin,
                role: this.state.adminRight,
                token: this.state.authToken
            })
            .then((res) => {
                this.setState({userrightstate: `${this.state.usernametoadmin}'s rights modified`});
            })
            .catch((err) => {
                if (!err.response) {
                    this.setState({userrightstate: "Erreur Serveur - Gateway"});
                }
                else {
                    this.setState({userrightstate: err.response.data.error});
                }
            });
        }
    }

    AddCollection = () => {
        if (this.state.newcollection === '') {
            this.setState({addcollectionstate: `Collection name can't be empty`})
        }
        axios.post(`${url}/addcollection`, {
            collection: this.state.newcollection,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({addcollectionstate: `${this.state.newcollection} added to db`}, this.getCollections);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({addcollectionstate: "Erreur Serveur - Gateway"});
            }
            else {
                this.setState({addcollectionstate: err.response.data.error});
            }
        });
    }

    ModifyCollection = () => {
        if (this.state.modifiedcollection2 === '') {
            this.setState({modifycollectionstate: `Collection name can't be empty`})
        }
        axios.post(`${url}/modifycollection`, {
            collection: this.state.modifiedcollection,
            newname: this.state.modifiedcollection2,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({modifycollectionstate: `${this.state.modifiedcollection} changed to ${this.state.modifiedcollection2}`}, this.getCollections);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({modifycollectionstate: "Erreur Serveur - Gateway"});
            }
            else {
                this.setState({modifycollectionstate: err.response.data.error});
            }
        });
    }

    Addloaner = () => {
        if (this.state.newloanername === '') {
            this.setState({newloanerstate: `Loaner's name can't be empty`})
        }
        axios.post(`${url}/addloaner`, {
            name: this.state.newloanername,
            mail: this.state.newloanermail, 
            phone: this.state.newloanerphone,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({newloanerstate: `Loaner ${this.state.newloanername} added to db`}, this.getLoaners);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({newloanerstate: "Erreur Serveur - Gateway"});
            }
            else {
                this.setState({newloanerstate: err.response.data.error});
            }
        });
    }

    ModifyLoaner = () => {
        if (this.state.modifiedloanername === '') {
            this.setState({modifiedloanerstate: `Loaner's name can't be empty`})
        }
        axios.post(`${url}/modifyloaner`, {
            loaner: this.state.modifiedloanername,
            name: this.state.modifiedloanername2,
            mail: this.state.modifiedloanermail,
            phone: this.state.modifiedloanerphone,
            token: this.state.authToken
        })
        .then((res) => {
            this.setState({modifiedloanerstate: `${this.state.modifiedloanername}'s information changed`}, this.getLoaners);
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({modifiedloanerstate: "Erreur Serveur - Gateway"});
            }
            else {
                this.setState({modifiedloanerstate: err.response.data.error});
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
                  {this.state.addattrstate}
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                    <label htmlFor="order">Order:</label>
                    <input type="text" value={this.state.order} onChange={this.handleInputChange} name="order" />
                    <button type="submit" name="order" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="suborder">SubOrder:</label>
                    <input type="text" value={this.state.suborder} onChange={this.handleInputChange} name="suborder" />
                    <button type="submit" name="suborder" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="family">Family:</label>
                    <input type="text" value={this.state.family} onChange={this.handleInputChange} name="family" />
                    <button type="submit" name="family" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="subfamily">SubFamily:</label>
                    <input type="text" value={this.state.subfamily} onChange={this.handleInputChange} name="subfamily" />
                    <button type="submit" name="subfamily" onClick={this.AddAttribute}>Ajouter</button>
                    <br />

                    <label htmlFor="subfamily">Tribu:</label>
                    <input type="text" value={this.state.tribu} onChange={this.handleInputChange} name="tribu" />
                    <button type="submit" name="tribu" onClick={this.AddAttribute}>Ajouter</button>
                    <br />

                    <label htmlFor="genus">Genus:</label>
                    <input type="text" value={this.state.genus} onChange={this.handleInputChange} name="genus" />
                    <button type="submit" name="genus" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="subgenus">SubGenus:</label>
                    <input type="text" value={this.state.subgenus} onChange={this.handleInputChange} name="subgenus" />
                    <button type="submit" name="subgenus" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="species">Species:</label>
                    <input type="text" value={this.state.species} onChange={this.handleInputChange} name="species" />
                    <button type="submit" name="species" onClick={this.AddAttribute}>Ajouter</button>
                    <br />
        
                    <label htmlFor="subspecies">SubSpecies:</label>
                    <input type="text" value={this.state.subspecies} onChange={this.handleInputChange} name="subspecies" />
                    <button type="submit" name="subspecies" onClick={this.AddAttribute}>Ajouter</button>
                  </form>
                </div>

                <div className="column">
                  <h3>Supprimer des classification</h3>
                  {this.state.deleteattrstate}
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
                    <button type="submit" name="order2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="suborder2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="family2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="subfamily2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="tribu2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="genus2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="subgenus2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="species2" onClick={this.DeleteAttribute}>Supprimer</button>
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
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button type="submit" name="subspecies2" onClick={this.DeleteAttribute}>Supprimer</button>
                  </form>
                </div>
        
                <div className="column">
                  <h3>Modifier données - Overwrite mode</h3>
                  <button type="submit">Soumettre</button>
                </div>
        
                <div className="column">
                    <h3>Ajouter un utilisateur</h3>
                    <form onSubmit={(event) => { this.onSubmit(event) }}>
                        <label htmlFor="newusername">Username:</label>
                        <input type="text" value={this.state.usernameToAdd} onChange={this.handleInputChange} name="usernameToAdd"/>
                        <br />
            
                        <label htmlFor="newpassword">Password:</label>
                        <input type="password" value={this.state.passwordToAdd} onChange={this.handleInputChange} name="passwordToAdd"/>
                        <br />

                        <label htmlFor="newpassword">Confirm password:</label>
                        <input type="password" value={this.state.passwordToAdd2} onChange={this.handleInputChange} name="passwordToAdd2" />
                        <br />

                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={this.state.adminToAdd === '1'} onChange={this.handleCheck} name="adminToAdd"/>} label='adminacces' />
                        </FormGroup>
                        <button type="submit" onClick={this.AddUser}>Ajouter</button>
                        <div>{this.state.useraddstate}</div>
                    </form>
                  <h3>Modifier un utilisateur</h3>
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                  <label htmlFor="usernametomodifyhtml">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                        labelId="usernametomodify-label"
                        id="usernametomodify-select"
                        value={this.state.usernametomodify}
                        label="usernametomodify"
                        onChange={this.handleInputChange}
                        name="usernametomodify"
                        >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.users.map((user) => (
                            <MenuItem key={user.username} value={user.username}>
                                {user.username}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <br />
        
                    <label htmlFor="newpassword">New password:</label>
                    <input type="password" value={this.state.newPassword} onChange={this.handleInputChange} name="newPassword" />
                    <br />
                    <label htmlFor="newpassword">Confirm password:</label>
                    <input type="password" value={this.state.newPassword2} onChange={this.handleInputChange} name="newPassword2" />
                    <br />
                    <button type="submit" onClick={this.ModifyPassword}>Modifier</button>
                    {this.state.usermodifstate}
                </form>
                  <h3>Modifier role utilisateur</h3>
                  <form onSubmit={(event) => { this.onSubmit(event) }}>
                  <label htmlFor="usernametoadmin">Username:</label>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            value={this.state.usernametoadmin}
                            label="usernametoadmin"
                            onChange={this.handleInputChange}
                            name='usernametoadmin'
                        >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.users.map((user) => (
                            <MenuItem key={user.username} value={user.username}>
                                {user.username}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <br />
        
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={this.state.adminRight === '1'} onChange={this.handleCheck} name="adminRight"/>} label='adminacces' />
                    </FormGroup>
                    <button type="submit" onClick={this.Modifyright}>Modifier</button>
                    {this.state.userrightstate}
                </form>
                </div>
                <div className='column'>
                    <h3>Ajouter une collection</h3>
                        <form onSubmit={(event) => { this.onSubmit(event) }}>
                            <label htmlFor="newcollection">New Collection:</label>
                            <input type="text" value={this.state.newcollection} onChange={this.handleInputChange} name="newcollection" />
                            <br />
                            <button type="submit" onClick={this.AddCollection}>Ajouter</button>
                            {this.state.addcollectionstate}
                        </form>
                    <h3>Modifier une collection</h3>
                        <form onSubmit={(event) => { this.onSubmit(event) }}>
                            <label htmlFor="modifiedcollection">Collection to modify:</label>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    value={this.state.modifiedcollection}
                                    label="modifiedcollection"
                                    onChange={this.handleInputChange}
                                    name='modifiedcollection'
                                >
                                <MenuItem value='NULL'>
                                    <em>None</em>
                                </MenuItem>
                                {this.state.collectionlist.map((col) => (
                                    <MenuItem key={col.name} value={col.name}>
                                        {col.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <label htmlFor="modifiedcollection">New collection's name:</label>
                            <input type="text" value={this.state.modifiedcollection2} onChange={this.handleInputChange} name="modifiedcollection2" />
                            <br />
                            <button type="submit" onClick={this.ModifyCollection}>Modifier</button>
                            {this.state.modifycollectionstate}
                        </form>
                </div>
                <div className='column'>
                    <h3>Ajouter un loaner</h3>
                        <form onSubmit={(event) => { this.onSubmit(event) }}>
                            <label htmlFor="newloaner">New Loaner's name:</label>
                            <input type="text" value={this.state.newloanername} onChange={this.handleInputChange} name="newloanername" />
                            <br />
                            <label htmlFor="newloaner">New Loaner's mail:</label>
                            <input type="text" value={this.state.newloanermail} onChange={this.handleInputChange} name="newloanermail" />
                            <br />
                            <label htmlFor="newloaner">New Loaner's phone:</label>
                            <input type="text" value={this.state.newloanerphone} onChange={this.handleInputChange} name="newloanerphone" />
                            <br />
                            <button type="submit" onClick={this.Addloaner}>Ajouter</button>
                            {this.state.newloanerstate}
                        </form>
                    <h3>Modifier un loaner</h3>
                        <form onSubmit={(event) => { this.onSubmit(event) }}>
                            <label htmlFor="modifiedloaner">Loaner to modify:</label>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    value={this.state.modifiedloanername}
                                    label="modifiedloanername"
                                    onChange={this.getLoanerInfo}
                                    name='modifiedloanername'
                                >
                                <MenuItem value='NULL'>
                                    <em>None</em>
                                </MenuItem>
                                {this.state.loanerlist.map((l) => (
                                    <MenuItem key={l.name} value={l.name}>
                                        {l.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <label htmlFor="modifiedcollection">Loaner's name:</label>
                            <input type="text" value={this.state.modifiedloanername2} onChange={this.handleInputChange} name="modifiedloanername2" />
                            <br />
                            <label htmlFor="newloaner">Loaner's mail:</label>
                            <input type="text" value={this.state.modifiedloanermail} onChange={this.handleInputChange} name="modifiedloanermail" />
                            <br />
                            <label htmlFor="newloaner">Loaner's phone:</label>
                            <input type="text" value={this.state.modifiedloanerphone} onChange={this.handleInputChange} name="modifiedloanerphone" />
                            <br />
                            <button type="submit" onClick={this.ModifyLoaner}>Modifier</button>
                            {this.state.modifiedloanerstate}
                        </form>
                </div>
                </div>
            </>

            ) : (
                <>
                {this.props.isAuthenticated() ?
                (
                    <Navigate to='/' />
                ) : (
                    <Navigate to='/sign-in' />
                )}
                </>
            )
        }
        </>
    )}
}




export default AdminPannel;