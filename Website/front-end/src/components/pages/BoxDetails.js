import * as React from 'react';
import { Navigate, useSearchParams } from "react-router-dom"
import Navbar from '../Navbar';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BoxAttributes from '../BoxAttributes'

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      attr: [],
      isLoaded: false,
      collection: undefined,
      loaner: undefined,
      collectionlist: [],
      loanerlist: []
    }
  }

  componentDidMount() {
    this.GetBox()
    this.getCollectionsAndLoaners()
  }

  getStateVar = () => {
    return this.state
  }

  GetBox = (event) => {
    axios.get(`${url}/get_boxdetails`, {params: {id: this.props.searchParams.get("id")}})
    .then((res) => {
        this.setState({attr: res.data.rows}, this.Loaded)
    })
  }

  getCollectionsAndLoaners = () => {
    axios.get(`${url}/get_loaners`)
    .then((res) => {
        this.setState({loanerslist: res.data.rows, loaner: this.props.loaner})
    })

    axios.get(`${url}/get_collections`)
        .then((res) => {
            this.setState({collectionlist: res.data.rows, collection: this.props.collection})
    })
  }

  Loaded = () => {
    this.setState({isLoaded: true, collection: this.state.attr[0].collection, loaner: this.state.attr[0].loaner})
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
            <p>Boite n° {this.props.searchParams.get("id")}  Collection: {this.state.collection}  {this.state.loaner ? (<>Loaner: {this.state.loaner}</>):(<></>)}</p>
            <div className="container">
    
              {this.props.isAuthenticated() ?
                (
                  <div className="column">
                    <div>
                      <h4 className="title">Collection</h4>
                          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                              <Select
                              id="collection-select"
                              value={this.state.collection}
                              onChange={this.handleInputChange}
                              name="collection"
                              >
                              <MenuItem value={null}>
                                  <em>None</em>
                              </MenuItem>
                              {this.state.collectionlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                              </Select>
                          </FormControl>
                    </div>
                    <button type='submit' onClick={this.modify}>Modifier</button>
                    <div>
                      <h4 className="title">Loaner</h4>
                          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                              <Select
                              id="loaner-select"
                              value={this.state.loaner}
                              onChange={this.handleInputChange}
                              name="loaner"
                              >
                              <MenuItem value={null}>
                                  <em>None</em>
                              </MenuItem>
                              {this.state.loanerlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                              </Select>
                          </FormControl>
                    </div>
                  </div>
                ):(
                  <></>
                )
              }
              
            
              {this.state.attr.map((data, index) => <BoxAttributes isAuthenticated={this.props.isAuthenticated}
                                                            index={index}
                                                            order={data.order}
                                                            suborder= {data.suborder}
                                                            family= {data.family}
                                                            subfamily= {data.subfamily}
                                                            genus= {data.genus}
                                                            subgenus= {data.subgenus}
                                                            species= {data.species}
                                                            subspecies= {data.subspecies}
                                                            tribu= {data.tribu}
                                                            loaner= {data.loaner}
                                                            grangebegin= {data.grangebegin}
                                                            grangeend= {data.grangeend}
                                                            srangebegin= {data.srangebegin}
                                                            srangeend= {data.srangeend}></BoxAttributes>)}
            </div>
            <div className="column">
                {/*Photo part*/}
                <h3>Pictures</h3>
            </div>
          </>
      )
    }
    </>
  )}
}

export function BoxDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  return <BoxDetails searchParams={searchParams} {...props}></BoxDetails>
}