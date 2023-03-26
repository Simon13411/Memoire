import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  {ResultsWNav} from './ResultsIndiv'

import axios from 'axios'

const url = process.env.REACT_APP_IP

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
      //pagination
      actualpage: 0,
      wantedpage: 0,
      maxpage: 0,
      wantedpagestate: ''
    }
  }

  isselectionempty() {
    return (this.state.order === 'NULL' && this.state.suborder === 'NULL' && this.state.genus === 'NULL' && this.state.subgenus === 'NULL' 
      && this.state.family === 'NULL' && this.state.subfamily === 'NULL' && this.state.species === 'NULL' && this.state.subspecies === 'NULL')
  }

  fetchResults = () => {
      axios.get(`${url}/get_indivresult`, {
        params:
        {offs: (this.state.actualpage*10).toString(), o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
      .then((res) => {
          this.setState({results: res.data.rows})
          if (res.data.rows[0].total_rows) {
            this.setState({maxpage: parseInt(res.data.rows[0].total_rows)})
          }
          else {
            this.setState({maxpage: 0})
          }
      })
  }

  get_selection() {
    axios.get(`${url}/get_selectiono`, {
      params:
      {so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({orderlist: res.data.rows})
    })

    axios.get(`${url}/get_selectionso`, {
      params:
      {o: this.state.order, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({suborderlist: res.data.rows})
    })

    axios.get(`${url}/get_selectiong`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({genuslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionsg`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({subgenuslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionf`, {
      params:
      {o: this.state.order, so: this.state.suborder, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({familylist: res.data.rows})
    })

    axios.get(`${url}/get_selectionsf`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({subfamilylist: res.data.rows})
    })

    axios.get(`${url}/get_selections`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({specieslist: res.data.rows})
    })

    axios.get(`${url}/get_selectionss`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species}})
    .then((res) => {
        this.setState({subspecieslist: res.data.rows})
    })

    axios.get(`${url}/get_selectiont`, {
      params:
      {o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
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

  wantedPageChange = (event) => {
    this.setState({wantedpage: event.target.value})
  }

  nextPage = () => {
    const wantedpage = this.state.actualpage+1
    this.setState({actualpage: wantedpage, wantedpage: wantedpage, wantedpagestate:''}, this.fetchResults)
  }

  previousPage = () => {
    const wantedpage = this.state.actualpage-1
    this.setState({actualpage: wantedpage, wantedpage: wantedpage, wantedpagestate:''}, this.fetchResults)
  }

  goToPage = () => {
    const wantedpage = parseInt(this.state.wantedpage)
    if (wantedpage > this.state.maxpage || wantedpage < 0) {
      this.wrongPage()
    }
    else {
      this.setState({actualpage: wantedpage, wantedpagestate: ''}, this.fetchResults)
    }
  }

  wrongPage = () => {
    this.setState({wantedpagestate: 'Invalid page number'})
  }
  
  componentDidMount() {
    axios.get(`${url}/get_indivresult`, {
      params:
      {offs: (this.state.actualpage*10).toString(), o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
    .then((res) => {
        this.setState({results: res.data.rows})
    })

    this.get_selection()
  }

  render() {
    return(
      <>
        <div className='selectdiv'>
          <button buttonStyle='btn--outline' onClick={this.fetchResults}>SEARCH INDIVIDUALS</button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
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
          {this.state.actualpage !== 0 ?
            (<button buttonStyle='btn--outline' onClick={this.previousPage}>Previous page</button>) : (<></>)
          }
          {this.state.actualpage < this.state.maxpage ?
            (<button buttonStyle='btn--outline' onClick={this.nextPage}>Next page</button>) : (<></>)
          }
          <button buttonStyle='btn--outline' onClick={this.goToPage}>Go to page n°</button><input type="number" value={this.state.wantedpage} onChange={this.wantedPageChange} size="5" />
          {this.state.wantedpagestate}
        </div>
        <ul class="datalist">
          {this.state.results.map((data) => <li><ResultsWNav id={data.id_individu} boxid={data.box_id} order={data.Order} suborder={data.subOrder} family={data.Family} subfamily={data.subFamily}></ResultsWNav></li>)}
        </ul>
      </>
    );
  }
}

export default Selection;