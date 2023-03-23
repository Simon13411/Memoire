import * as React from 'react';
import Navbar from '../Navbar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BoxDetailsAdmin from './BoxDetailsAdmin';

import axios from 'axios'
const url = 'http://192.168.1.15:4000'

class BoxDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      order: 'NULL',
      suborder: 'NULL',
      genus: 'NULL',
      subgenus: 'NULL',
      family: 'NULL',
      subfamily: 'NULL',
      species: 'NULL',
      subspecies: 'NULL',
      tribus: 'NULL',
      loaner: 'NULL',
      rangebegin: 'NULL',
      rangeend: 'NULL',
      collection: 'NULL',
      orderlist: [],
      suborderlist: [],
      genuslist: [],
      subgenuslist: [],
      familylist: [],
      subfamilylist: [],
      specieslist: [],
      subspecieslist: [],
      tribuslist: [],
      loanerlist: [],
      rangebeginlist: [],
      rangeendlist: [],
      collectionlist: [],
    }
  }

  GetBox = (event) => {
    axios.get(`${url}/get_result/0/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}/${this.state.tribu}`)
    .then((res) => {
        this.setState({results: res.data.rows})
    })
  }

  OrderChange = (event) => {
    this.setState({order: event.target.value})
  }

  render() {
    return (
      <>
      {this.props.isAuthenticated() ? 
        (
        //Admin's Version
          <BoxDetailsAdmin/>
        ) : (
        //User's Version
        <>
        <Navbar />
        <div className="container">
            <div>
              <p className="title">Order</p>
              {(this.state.order) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.order}</p>)
              }
            </div>
            <div>
              <p className="title">Suborder</p>
              {(this.state.suborder) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.suborder}</p>)
              }
            </div>
            <div>
              <p className="title">Genus</p>
              {(this.state.genus) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.genus}</p>)
              }
            </div>
            <div>
              <p  className="title">Subgenus</p>
              {(this.state.subgenus) === 'NULL'? 
                (<></>)
                :
                (<p>{this.state.subgenus}</p>)
              }
            </div>
            <div>
              <p className="title">Family</p>
              {(this.state.family) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.family}</p>)
              }
            </div>
            <div>
              <p className="title">Subfamily</p>
              {(this.state.subfamily) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.subfamily}</p>)
              }
            </div>
            <div>
              <p className="title">Species</p>
              {(this.state.species) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.species}</p>)
              }
            </div>
            <div>
              <p className="title">Subspecies</p>
              {(this.state.subspecies) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.subspecies}</p>)
              }
            </div>
            <div>
              <p className="title">Tribus</p>
              {(this.state.tribus) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.tribus}</p>)
              }
            </div>
            <div>
              <p className="title">Loaner</p>
              {(this.state.loaner) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.loaner}</p>)
              }
            </div>
            <div>
              <p className="title">Range</p>
              {(this.state.rangebegin) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.rangebegin}-{this.state.rangeend}</p>)
              }
            </div>
            <div>
              <p className="title">Collection</p>
              {(this.state.collection) === 'NULL' ?
                (<></>)
                :
                (<p>{this.state.collection}</p>)
              }
            </div>
        </div>
      </>
      )
    }
    </>
  )}
}

export default BoxDetails;