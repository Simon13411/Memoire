import * as React from 'react';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from '../Navbar';

import InsectDetailsAdmin from '../InsectDetailsAdmin';
import Cookies from 'js-cookie';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class InsectDetails extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        individ: null,
        name: null,
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
        loaner: null,
        orderlist: [],
        suborderlist: [],
        genuslist: [],
        subgenuslist: [],
        familylist: [],
        subfamilylist: [],
        specieslist: [],
        subspecieslist: [],
        tribuslist: [],
        loanerslist: [],
        isLoaded: false,
        newidbox: 0,
        newloaner: null,
        modifyboxstate: '',
        modifyloanerstate: '',
        deletestate: ''
      }
    }

    componentDidMount() {
      this.getIndiv()
      this.getLoaners()
    }

    getStateVar = () => {
      return this.state
    }  
  
    getIndiv = () => {
      axios.get(`${url}/get_indivdetails`, {params: {id: this.props.searchParams.get("id")}})
      .then((res) => {
          this.setState({individ: res.data.rows[0].id_individu,
                        name: res.data.rows[0].name,
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
                        loaner: res.data.rows[0].loaner,
                        newloaner: res.data.rows[0].loaner}, this.Loaded)
      })
    }

    getLoaners = () => {
      axios.get(`${url}/get_loaners`)
      .then((res) => {
          this.setState({loanerslist: res.data.rows})
      })
    }

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

    modifybox = () => {
      const authToken = Cookies.get('auth_token');

      this.setState({modifyboxstate: 'Changement en cours...'})
      const newboxid = parseInt(this.state.newidbox)
      axios.post(`${url}/changeindivboxid`, {individ: this.state.individ, newboxid: newboxid, token: authToken})
      .then((res) => {
        this.setState({idbox: newboxid, modifyboxstate: `Assigné à la box n° ${newboxid}`})
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({modifyboxstate: 'Erreur Serveur - Gateway'})
        }
        else {
          this.setState({modifyboxstate: err.response.data.error})
        }
      })
    }

    modifyloaner = () => {
      const authToken = Cookies.get('auth_token');

      this.setState({modifyloanerstate: 'Changement en cours...'})
      const newloaner = this.state.newloaner
      axios.post(`${url}/changeindivloaner`, {individ: this.state.individ, newloaner: newloaner, token: authToken})
      .then((res) => {
        this.setState({loaner: newloaner, modifyloanerstate: `Borrower est maintenant ${newloaner}`})
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({modifyloanerstate: 'Erreur Serveur - Gateway'})
        }
        else {
          this.setState({modifyloanerstate: err.response.data.error})
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
          this.setState({deletestate: 'Erreur Serveur - Gateway'})
        }
        else {
          this.setState({deletestate: err.response.data.error})
        }
      })
    }

    render() {
      return (
        <>
        {!this.props.searchParams.get("id") ?
          ( 
          <Navigate to='/' /> 
          ):(
            <>
              <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
              <p>Individual n° {this.props.searchParams.get("id")} {this.state.name ? (<>Name: {this.state.name}</>):(<></>)} {this.state.idbox !== 0 ? (<>From Box n° {this.state.idbox}</>):(<></>)} {this.state.loaner ? (<>Borrower: {this.state.loaner}</>):(<></>)}</p>
              {this.props.isAdmin() ? 
              (
                <div>
                  <button type='submit' onClick={this.deleteindiv}>Delete Individual</button>
                  {this.state.deletestate}
                </div>
              ):(
                <></>
              )}
              <div className="container">
                {/*Info part*/}
                {this.props.isAuthenticated() ?
                (
                  <div className="column">
                    <div>
                      <div>
                        <h4 className="title">Box n°</h4>
                          <input type="number" value={this.state.newidbox} width="40" onChange={this.handleInputChange} name="newidbox" />
                      </div>
                      <button type="submit" name="newidbox" onClick={this.modifybox}>Modifier</button>
                    </div>
                    {this.state.modifyboxstate}
                    <div>
                      <div>
                        <h4 className="title">Borrower</h4>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                <Select
                                id="loaner-select"
                                value={this.state.newloaner}
                                onChange={this.handleInputChange}
                                name="newloaner"
                                >
                                <MenuItem value={null}>
                                    <em>None</em>
                                </MenuItem>
                                {this.state.loanerslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                      </div>
                      <button type='submit' onClick={this.modifyloaner}>Modifier</button>
                    </div>
                    {this.state.modifyloanerstate}
                  </div>
                ):(
                  <></>
                )
              }
              
                <div className="column">
                  <h2 className="title">Modify Population</h2>
                    <div>
                      {(this.state.idbox) === 0 ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Box ID</h4>
                        <p>{this.state.idbox}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.order) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Order</h4>
                        <p>{this.state.order}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.suborder) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Suborder</h4>
                        <p>{this.state.suborder}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.genus) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Genus</h4>
                        <p>{this.state.genus}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subgenus)? 
                        (<></>)
                        :
                        <>
                        <h4  className="title">Subgenus</h4>
                        <p>{this.state.subgenus}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.family) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Family</h4>
                        <p>{this.state.family}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subfamily) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Subfamily</h4>
                        <p>{this.state.subfamily}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.species) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Species</h4>
                        <p>{this.state.species}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subspecies) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Subspecies</h4>
                        <p>{this.state.subspecies}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.tribu) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Tribu</h4>
                        <p>{this.state.tribu}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.loaner) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Loaner</h4>
                        <p>{this.state.loaner}</p>
                        </>
                      }
                    </div>
                </div>
                {this.props.isAuthenticated() && this.state.isLoaded ? 
                  (
                    //Admin Tools
                    <InsectDetailsAdmin isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout} getIndiv={this.getIndiv}
                    id={this.state.individ} order={this.state.order} suborder={this.state.suborder} genus={this.state.genus} subgenus={this.state.subgenus}
                    family={this.state.family} subfamily={this.state.subfamily} species={this.state.species} subspecies={this.state.subspecies} tribu={this.state.tribu}/>
                  ) : (
                    <></>
                  )
                }
              </div>
              </>
            )
            }
            </>
  )}
}

export function InsectDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  return <InsectDetails navigate={navigate} searchParams={searchParams} {...props}></InsectDetails>
}