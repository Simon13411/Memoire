import * as React from 'react';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from '../components/Navbar';

import Cookies from 'js-cookie';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import BoxAttributes from '../components/BoxAttributes'
import BoxDetailsAddPop from '../components/BoxDetailsAddPop';

import axios from 'axios'
import BoxDetailsModifPop from '../components/BoxDetailsModifPop';
const url = process.env.REACT_APP_IP

class BoxDetails extends React.Component {
  constructor (props) {
    super(props)
        this.state = {
            attr: [],
            isLoaded: false,
            collection: null,
            borrower: null,
            collectionlist: [],
            borrowerslist: [],
            newcollection: null,
            newborrower: null,
            modifycollectionstate: '',
            modifyborrowerstate: '',
            imageURL: null,
            deletestate: '',
            mode: 0 //modification mode = 1
        }
  }

    componentDidMount() {
        this.GetBox()
        this.getCollections()
        this.getBorrowers()
        this.getPicture()
    }

    /* Consistency: First attribute to have two different name is the maxPopDegree */
    maxPopDegree = (newattributelist) => {
        const attributes = ['order','suborder','family','subfamily','tribu','genus','subgenus','species','subspecies']
        var maxdegree = null
        for (let i=0; i< attributes.length; i++) {
            for (let j=0; j<this.state.attr.length; j++){
                if (this.state.attr[j][attributes[i]] !== newattributelist[i]) {
                if (maxdegree === null) {
                    maxdegree = attributes[i]
                    break;
                }
                else {
                    return "You can't have such a population in this box (Degree of precision)"
                }
                }
            }
        }
        return "ok"
    }

    /* ------------------- Page stuff ---------------------*/
    Loaded = () => {
        this.setState({isLoaded: true, collection: this.state.attr[0].collection, borrower: this.state.attr[0].borrower})
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

    changefetchedpop = (childstatevar, index) => {
        var newAttr = this.state.attr;
        newAttr[index].order = childstatevar.order
        newAttr[index].suborder = childstatevar.suborder
        newAttr[index].family = childstatevar.family
        newAttr[index].subfamily = childstatevar.subfamily
        newAttr[index].tribu = childstatevar.tribu
        newAttr[index].genus = childstatevar.genus
        newAttr[index].subgenus = childstatevar.subgenus
        newAttr[index].species = childstatevar.species
        newAttr[index].subspecies = childstatevar.subspecies
        this.setState({attr: newAttr})
    }

    refreshPage() {
        window.location.reload(false)
    }

    /* ----------- HTTP REQUESTS -------------- */
    GetBox = (event) => {
        axios.get(`${url}/get_boxdetails`, {params: {id: this.props.searchParams.get("id")}})
        .then((res) => {
            this.setState({attr: res.data.rows, collection: res.data.rows[0].collection, newcollection: res.data.rows[0].collection, borrower: res.data.rows[0].borrower, newborrower: res.data.rows[0].borrower}, this.Loaded)
        })
    }

    getCollections = () => {
        axios.get(`${url}/get_collections`)
        .then((res) => {
            this.setState({collectionlist: res.data.rows})
        })
    }

    getBorrowers = () => {
        axios.get(`${url}/get_borrowers`)
        .then((res) => {
            this.setState({borrowerslist: res.data.rows})
        })
    }

    getPicture = () => {
        const type = "Boxes"
        const id = this.props.searchParams.get("id")
        axios.get(`${url}/getpicture`, {params : {type: type, id: id}}, { responseType: 'blob' })
        .then(response => {
            const imageurl = window.URL.createObjectURL(new Blob([response.data]));
            this.setState({imageURL: `${url}/getpicture?type=${type}&id=${id}`})
        })
    }

    modifycollection = () => {
        const authToken = Cookies.get('auth_token');

        this.setState({modifycollectionstate: 'Change in progress...'})
        const newcollection = this.state.newcollection
        axios.post(`${url}/changeboxcollection`, {boxid: this.props.searchParams.get("id"), collection: newcollection, token: authToken})
        .then((res) => {
            this.setState({collection: newcollection, modifycollectionstate: `Box is now from collection ${newcollection}`})
        })
        .catch((err) => {
            if (!err.response) {
                this.setState({modifycollectionstate: 'Server Error - Gateway'})
            }
            else {
                this.setState({modifycollectionstate: err.response.data.error})
            }
        })
    }

    modifyborrower = () => {
        const authToken = Cookies.get('auth_token');

        this.setState({modifyborrowerstate: 'Change in progress...'})
        const newborrower = this.state.newborrower
        axios.post(`${url}/changeboxborrower`, {boxid: this.props.searchParams.get("id"), newborrower: newborrower, token: authToken})
        .then((res) => {
            this.setState({borrower: newborrower, modifyborrowerstate: `borrower is now ${newborrower}`})
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

    deletebox = () => {
        const authToken = Cookies.get('auth_token');

        axios.post(`${url}/deletebox`, {id: this.props.searchParams.get("id"), token: authToken})
        .then((res) => {
            this.props.navigate('/')
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
                    <p>Box n° {this.props.searchParams.get("id")} from collection {this.state.collection}  {this.state.borrower ? (<>borrowed by {this.state.borrower}</>):(<></>)}</p>
                    {this.props.isAuthenticated() && 
                        <div>
                            <FormControlLabel name="mode" onChange={this.handleCheck} control={<Checkbox color="success"/>} label="Modification mode" />
                        </div>
                    }
                    {(this.props.isAdmin() && this.state.mode===1) &&
                        <div>
                            <button type='submit' onClick={this.deletebox}>Delete Box</button>
                            {this.state.deletestate}
                        </div>
                    }
                    <div classname="datalist">
                        <TableContainer sx={{width:'auto', flex:1}}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pop n°</TableCell>
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
                            {this.state.attr.map((data, index) => <BoxAttributes
                                                                        index={index}
                                                                        order={data.order}
                                                                        suborder= {data.suborder}
                                                                        family= {data.family}
                                                                        subfamily= {data.subfamily}
                                                                        genus= {data.genus}
                                                                        subgenus= {data.subgenus}
                                                                        species= {data.species}
                                                                        subspecies= {data.subspecies}
                                                                        tribu= {data.tribu}></BoxAttributes>)}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="container">
                        {this.props.isAuthenticated() && this.state.mode===1 &&
                        <>
                            <div className="column">
                                <div>
                                <h4 className="title">Collection</h4>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                        <Select id="collection-select" value={this.state.newcollection} onChange={this.handleInputChange} name="newcollection">
                                            <MenuItem value={null}>
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.collectionlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </div>
                                <button type='submit' onClick={this.modifycollection}>Modify</button>
                                <div>{this.state.modifycollectionstate}</div>
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
                                <div>{this.state.modifyborrowerstate}</div>
                            </div>
                            {this.state.attr.map((data, index) => <BoxDetailsModifPop
                                index={index}
                                id={this.props.searchParams.get("id")}
                                order={data.order}
                                suborder= {data.suborder}
                                family= {data.family}
                                subfamily= {data.subfamily}
                                genus= {data.genus}
                                subgenus= {data.subgenus}
                                species= {data.species}
                                subspecies= {data.subspecies}
                                tribu= {data.tribu}
                                maxPopDegree={this.maxPopDegree} changefetchedpop={this.changefetchedpop}></BoxDetailsModifPop>)}
                            <BoxDetailsAddPop refresh={this.refreshPage} id={this.props.searchParams.get("id")} maxPopDegree={this.maxPopDegree}/>
                        </>
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
    )}
}

export function BoxDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  return <BoxDetails navigate={navigate} searchParams={searchParams} {...props}></BoxDetails>
}
