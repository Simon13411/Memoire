import * as React from 'react';
import './Selection.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Results, {ResultsWNav} from './Results'

import axios from 'axios'
const url = 'http://192.168.1.15:4000'

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
      tribu: 'NULL',
      results: [],
      orderlist: [],
      suborderlist: [],
      genuslist: [],
      subgenuslist: [],
      familylist: [],
      subfamilylist: [],
      specieslist: [],
      subspecieslist: [],
      tribulist: [],
    }
  }

  isselectionempty() {
    return (this.state.order === 'NULL' && this.state.suborder === 'NULL' && this.state.genus === 'NULL' && this.state.subgenus === 'NULL' 
      && this.state.family === 'NULL' && this.state.subfamily === 'NULL' && this.state.species === 'NULL' && this.state.subspecies === 'NULL')
  }

  fetchResults = () => {
      axios.get(`${url}/get_result/0/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}/${this.state.tribu}`)
      .then((res) => {
          this.setState({results: res.data.rows})
      })
  }

  get_selection() {
    axios.get(`${url}/get_selectiono/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({orderlist: res.data.rows})
    })

    axios.get(`${url}/get_selectionso/${this.state.order}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({suborderlist: res.data.rows})
    })

    axios.get(`${url}/get_selectiong/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({genuslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionsg/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({subgenuslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionf/${this.state.order}/${this.state.suborder}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({familylist: res.data.rows})
    })

    axios.get(`${url}/get_selectionsf/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({subfamilylist: res.data.rows})
    })

    axios.get(`${url}/get_selections/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({specieslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionss/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.tribu}/${this.state.genus}/${this.state.subgenus}/${this.state.species}`)
    .then((res) => {
        this.setState({subspecieslist: res.data.rows})
    })

    axios.get(`${url}/get_selectiont/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}`)
    .then((res) => {
        this.setState({tribulist: res.data.rows})
    })
  }

  OrderChange = (event) => {
    this.setState({order: event.target.value}, this.get_selection)
  }

  subOrderChange = (event) => {
    this.setState({suborder: event.target.value}, this.get_selection)
  }

  GenusChange = (event) => {
    this.setState({genus: event.target.value}, this.get_selection)
  }
  subGenusChange = (event) => {
    this.setState({subgenus: event.target.value}, this.get_selection)
  }
  FamilyChange = (event) => {
    this.setState({family: event.target.value}, this.get_selection)
  }
  subFamilyChange = (event) => {
    this.setState({subfamily: event.target.value}, this.get_selection)
  }
  SpeciesChange = (event) => {
    this.setState({species: event.target.value}, this.get_selection)
  }
  subSpeciesChange = (event) => {
    this.setState({subspecies: event.target.value}, this.get_selection)
  }
  
  componentDidMount() {
    axios.get(`${url}/get_result/0/${this.state.order}/${this.state.suborder}/${this.state.family}/${this.state.subfamily}/${this.state.genus}/${this.state.subgenus}/${this.state.species}/${this.state.subspecies}/${this.state.tribu}`)
    .then((res) => {
        this.setState({results: res.data.rows})
    })

    this.get_selection()
  }

  render() {
    return(
      <>
        <Box sx={{m:1, border: 1, borderColor: 'green', width:180}}>
          <button buttonStyle='btn--outline' onClick={this.fetchResults}>SEARCH BOXES</button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
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
              {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="demo-simple-select-label">Tribu</InputLabel>
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
              {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <ul class="datalist">
          {this.state.results.map((data) => <li><ResultsWNav id={data.id_box} order={data.Order} suborder={data.subOrder} family={data.Family} subfamily={data.subFamily}></ResultsWNav></li>)}
        </ul>
      </>
    );
  }
}

export default Selection;