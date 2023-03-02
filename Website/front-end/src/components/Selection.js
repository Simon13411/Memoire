import * as React from 'react';
import './Selection.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Result from './Results'

import axios from 'axios'
const url = 'http://localhost:4000'

class Selection extends React.Component {
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
      subtribus: 'NULL',
      results: [],
      orderlist: [],
      suborderlist: [],
      genuslist: [],
      subgenuslist: [],
      familylist: [],
      subfamilylist: [],
      specieslist: [],
      subspecieslist: [],
      tribuslist: [],
      subtribuslist: []
    }
  }

  isselectionempty() {
    return (this.state.order === 'NULL' && this.state.suborder === 'NULL' && this.state.genus === 'NULL' && this.state.subgenus === 'NULL' 
      && this.state.family === 'NULL' && this.state.subfamily === 'NULL' && this.state.species === 'NULL' && this.state.subspecies === 'NULL')
  }

  fetchResults = () => {
    if (!this.isselectionempty()) {
      axios.get(`${url}/get_result/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}`)
      .then((res) => {
          this.setState({results: res.data.rows})
      })
    }
    else {
      axios.get(`${url}/get_all`)
      .then((res) => {
          this.setState({results: res.data.rows})
      })
    }
  }

  OrderChange = (event) => {
    this.setState({order: event.target.value})
  }

  subOrderChange = (event) => {
    this.setState({suborder: event.target.value})
  }

  GenusChange = (event) => {
    this.setState({genus: event.target.value})
  }
  subGenusChange = (event) => {
    this.setState({subgenus: event.target.value})
  }
  FamilyChange = (event) => {
    this.setState({family: event.target.value})
  }
  subFamilyChange = (event) => {
    this.setState({subfamily: event.target.value})
  }
  SpeciesChange = (event) => {
    this.setState({species: event.target.value})
  }
  subSpeciesChange = (event) => {
    this.setState({subspecies: event.target.value})
  }
  
  componentDidMount() {
    /*axios.get(`${url}/get_all`)
    .then((res) => {
        this.setState({results: res.data.rows})
    })*/

    axios.get(`${url}/get_selection`)
    .then((res) => {
        this.setState({orderlist: res.data.rows})
    })
  }

  render() {
    return(
      <>
        <Box sx={{m:1, border: 1, borderColor: 'green', width:130}}>
          <button buttonStyle='btn--outline' onClick={this.fetchResults}>SEARCH BOXES</button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Order</InputLabel>
            <Select
              labelId="order-label"
              id="order-select"
              value={this.state.order}
              label="Order"
              onChange={this.OrderChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
              <MenuItem value={"Hymenoptera"}>Hymenoptera</MenuItem>
              <MenuItem value={"Lepidoptera"}>Lepidoptera</MenuItem>
              <MenuItem value={30}>Quad</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">SubOrder</InputLabel>
            <Select
              labelId="suborder-label"
              id="suborder-select"
              value={this.state.suborder}
              label="subOrder"
              onChange={this.subOrderChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Genus</InputLabel>
            <Select
              labelId="genus-label"
              id="genus-select"
              value={this.state.genus}
              label="Genus"
              onChange={this.GenusChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">SubGenus</InputLabel>
            <Select
              labelId="subgenus-label"
              id="subgenus-select"
              value={this.state.subgenus}
              label="subGenus"
              onChange={this.subGenusChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Family</InputLabel>
            <Select
              labelId="family-label"
              id="family-select"
              value={this.state.family}
              label="family"
              onChange={this.FamilyChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">SubFamily</InputLabel>
            <Select
              labelId="subfamily-label"
              id="subfamily-select"
              value={this.state.subfamily}
              label="subfamily"
              onChange={this.subFamilyChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Species</InputLabel>
            <Select
              labelId="species-label"
              id="species-select"
              value={this.state.species}
              label="Species"
              onChange={this.SpeciesChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Four</MenuItem>
              <MenuItem value={30}>Quad</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">SubSpecies</InputLabel>
            <Select
              labelId="subspecies-label"
              id="subspecies-select"
              value={this.state.subspecies}
              label="Species"
              onChange={this.subSpeciesChange}
            >
              <MenuItem value='NULL'>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Four</MenuItem>
              <MenuItem value={30}>Quad</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ul class="datalist">
          {this.state.results.map((data) => <li><Result order={data.Order} suborder={data.subOrder} family={data.Family} subfamily={data.SubFamily}></Result></li>)}
        </ul>
      </>
    );
  }
}

export default Selection;