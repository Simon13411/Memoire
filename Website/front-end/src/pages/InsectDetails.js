import * as React from 'react';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from '../components/Navbar';

import InsectDetailsModifPop from '../components/InsectDetailsModifPop';
import Cookies from 'js-cookie';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class InsectDetails extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            individ: null,
            idbox: 0,
            order: null,
            suborder: null,
            genus: null,
            subgenus: null,
            family: null,
            subfamily: null,
            species: null,
            subspecies: null,
            tribu: null,
            borrower: null,
            orderlist: [],
            suborderlist: [],
            genuslist: [],
            subgenuslist: [],
            familylist: [],
            subfamilylist: [],
            specieslist: [],
            subspecieslist: [],
            tribuslist: [],
            borrowerslist: [],
            isLoaded: false,
            newidbox: 0,
            newborrower: null,
            modifyboxstate: '',
            modifyborrowerstate: '',
            deletestate: '',
            imageURL: null,
            mode: 0 //modification mode = 1
        }
    }

    componentDidMount() {
        this.getIndiv()
        this.getBorrowers()
        this.getPicture()
    }

    /*  ------------------- Page stuff ---------------------*/
    Loaded = () => {
        this.setState({isLoaded: true})
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleCheck = (event) => {
        const target = event.target;
        const value = target.checked ? 1 : 0; //if crossed 1 if not 0
        const name = target.name;
    
        this.setState({
            [name]: value
        })
    }
  
    /* ----------- HTTP REQUESTS -------------- */
    getIndiv = () => {
        axios.get(`${url}/get_indivdetails`, {params: {id: this.props.searchParams.get("id")}})
        .then((res) => {
            this.setState({individ: res.data.rows[0].id_individu,
                            idbox: res.data.rows[0].box_id,
                            newidbox: res.data.rows[0].box_id,
                            order: res.data.rows[0].order,
                            suborder: res.data.rows[0].suborder,
                            family: res.data.rows[0].family,
                            subfamily: res.data.rows[0].subfamily,
                            genus: res.data.rows[0].genus,
                            subgenus: res.data.rows[0].subgenus,
                            species: res.data.rows[0].species,
                            subspecies: res.data.rows[0].subspecies,
                            tribu: res.data.rows[0].tribu,
                            borrower: res.data.rows[0].borrower,
                            newborrower: res.data.rows[0].borrower}, this.Loaded)
        })
    }

    getBorrowers = () => {
        axios.get(`${url}/get_borrowers`)
        .then((res) => {
            this.setState({borrowerslist: res.data.rows})
        })
    }

    getPicture = () => {
        const type = "Individuals"
        const id = this.props.searchParams.get("id")
        axios.get(`${url}/getpicture`, {params : {type: type, id: id}}, { responseType: 'blob' })
        .then(response => {
            const imageurl = window.URL.createObjectURL(new Blob([response.data]));
            this.setState({imageURL: `${url}/getpicture?type=${type}&id=${id}`})
        })
    }

    modifybox = () => {
        const authToken = Cookies.get('auth_token');

        this.setState({modifyboxstate: 'Change in progress...'})
        const newboxid = parseInt(this.state.newidbox)
        axios.post(`${url}/changeindivboxid`, {individ: this.state.individ, newboxid: newboxid, token: authToken})
        .then((res) => {
            this.setState({idbox: newboxid, modifyboxstate: `Assigned to box n° ${newboxid}`})
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({modifyboxstate: 'Server Error - Gateway'})
            }
            else {
                this.setState({modifyboxstate: err.response.data.error})
            }
        })
    }

    modifyborrower = () => {
        const authToken = Cookies.get('auth_token');

        this.setState({modifyborrowerstate: 'Change in progress...'})
        const newborrower = this.state.newborrower
        axios.post(`${url}/changeindivborrower`, {individ: this.state.individ, newborrower: newborrower, token: authToken})
        .then((res) => {
            this.setState({borrower: newborrower, modifyborrowerstate: `Borrower is now ${newborrower}`})
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({modifyborrowerstate: 'Server Error - Gateway'})
            }
            else {
                this.setState({modifyborrowerstate: err.response.data.error})
            }
        })
    }

    deleteindiv = () => {
        const authToken = Cookies.get('auth_token');

        axios.post(`${url}/deleteindiv`, {id: this.state.individ, token: authToken})
        .then((res) => {
            this.props.navigate('/individual-search')
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({deletestate: 'Server Error - Gateway'})
            }
            else {
                this.setState({deletestate: err.response.data.error})
            }
        })
    }

    /* ------------------- RENDERING ----------------------- */
    render() {
        return (
            <>
            {!this.props.searchParams.get("id") ?
                ( 
                <Navigate to='/' /> 
                ):(
                    <>
                    <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                    <p>{this.state.individ && <>Individual {this.state.individ}</>} {this.state.idbox !== 0 && <>from Box n° {this.state.idbox}</>} {this.state.borrower && <>borrowed by {this.state.borrower}</>}</p>
                    {this.props.isAuthenticated() &&
                        <div>
                            <FormControlLabel name="mode" onChange={this.handleCheck} control={<Checkbox color="success"/>} label="Modification mode" />
                        </div>
                    }
                    {this.props.isAdmin() && this.state.mode===1  ? 
                        (
                            <div>
                            <button type='submit' onClick={this.deleteindiv}>Delete Individual</button>
                            {this.state.deletestate}
                            </div>
                        ):(
                            <></>
                        )
                    }
                    <TableContainer sx={{width:'auto', flex:1}}>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order</TableCell>
                                <TableCell>Suborder</TableCell>
                                <TableCell>Family</TableCell>
                                <TableCell>Subfamily</TableCell>
                                <TableCell>Tribe</TableCell>
                                <TableCell>Genus</TableCell>
                                <TableCell>Subgenus</TableCell>
                                <TableCell>species</TableCell>
                                <TableCell>subspecies</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={this.state.individ}>
                                <TableCell>{this.state.order}</TableCell>
                                <TableCell>{this.state.suborder}</TableCell>
                                <TableCell>{this.state.family}</TableCell>
                                <TableCell>{this.state.subfamily}</TableCell>
                                <TableCell>{this.state.tribu}</TableCell>
                                <TableCell>{this.state.genus}</TableCell>
                                <TableCell>{this.state.subgenus}</TableCell>
                                <TableCell>{this.state.species}</TableCell>
                                <TableCell>{this.state.subspecies}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="container">
                        {this.props.isAuthenticated() && this.state.mode===1 &&
                            <div className="column">
                                <div>
                                    <div>
                                        <h4 className="title">Box n°</h4>
                                        <input type="number" value={this.state.newidbox} width="40" onChange={this.handleInputChange} name="newidbox" />
                                    </div>
                                    <button type="submit" name="newidbox" onClick={this.modifybox}>Modify</button>
                                </div>
                                {this.state.modifyboxstate}
                                <div>
                                    <div>
                                        <h4 className="title">Borrower</h4>
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                            <Select id="borrower-select" value={this.state.newborrower} onChange={this.handleInputChange} name="newborrower">
                                                <MenuItem value={null}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {this.state.borrowerslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                                            </Select>
                                            </FormControl>
                                    </div>
                                    <button type='submit' onClick={this.modifyborrower}>Modify</button>
                                </div>
                                {this.state.modifyborrowerstate}
                            </div>
                        }
                        {this.props.isAuthenticated() && this.state.isLoaded && this.state.mode===1 &&
                            //Admin Tools
                            <InsectDetailsModifPop isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout} getIndiv={this.getIndiv}
                            id={this.state.individ} order={this.state.order} suborder={this.state.suborder} genus={this.state.genus} subgenus={this.state.subgenus}
                            family={this.state.family} subfamily={this.state.subfamily} species={this.state.species} subspecies={this.state.subspecies} tribu={this.state.tribu}/>
                        }
                    </div>
                    <div className='container'>
                        <div className="column">
                            <h3>Pictures</h3>
                            {this.state.imageURL &&
                                <a href={this.state.imageURL}>
                                    <img src={this.state.imageURL} width={250} height={250}/>
                                </a>
                            }
                        </div>
                    </div>
                    </>
                    )
                }
                </>
        )
    }
}

export function InsectDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  return <InsectDetails navigate={navigate} searchParams={searchParams} {...props}></InsectDetails>
}