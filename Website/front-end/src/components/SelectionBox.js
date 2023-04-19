import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  {ResultsWNav} from './ResultsBox'

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
        axios.get(`${url}/get_boxresult`, {
            params:
            {offs: (this.state.actualpage*10).toString(), o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
        .then((res) => {
            this.setState({results: res.data.rows})
            if (res.data.rows.length > 0) {
                this.setState({maxpage: Math.floor(parseInt(res.data.rows[0].total_rows)/10)})
            }
            else {
                this.setState({maxpage: 0})
            }
        })
    }

    fetchResultsOnClick = () => {
        this.setState({actualpage: 0, wantedpage: 0}, this.fetchResults)
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

    handleAttributeChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
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
        axios.get(`${url}/get_boxresult`, {
            params:
            {offs: (this.state.actualpage*10).toString(), o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
        .then((res) => {
            this.setState({results: res.data.rows})
            if (res.data.rows[0].total_rows) {
                this.setState({maxpage: Math.floor(parseInt(res.data.rows[0].total_rows)/10)})
            }
            else {
                this.setState({maxpage: 0})
            }
        })
        this.get_selection()
    }

    render() {
        return(
            <>
            <div className='selectdiv'>
                <button buttonStyle='btn--outline' onClick={this.fetchResultsOnClick}>SEARCH BOXES</button>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                        <Select value={this.state.order} label="Order" name="order" onChange={this.handleAttributeChange} >
                            <MenuItem value='NULL'>
                                <em>None</em>
                            </MenuItem>
                            {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">SubOrder</InputLabel>
                    <Select value={this.state.suborder} name="suborder" label="subOrder" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Family</InputLabel>
                    <Select value={this.state.family} name="family" label="family" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">SubFamily</InputLabel>
                    <Select value={this.state.subfamily} name="subfamily" label="subfamily" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Tribe</InputLabel>
                    <Select value={this.state.tribu} name="tribu" label="Tribu" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Genus</InputLabel>
                    <Select value={this.state.genus} name="genus" label="Genus" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">SubGenus</InputLabel>
                    <Select value={this.state.subgenus} name="subgenus" label="subGenus" onChange={this.handleAttributeChange}>
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Specie</InputLabel>
                    <Select value={this.state.species} name="species" label="Species" onChange={this.handleAttributeChange}>
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">SubSpecie</InputLabel>
                    <Select value={this.state.subspecies} name="subspecies" label="Species" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
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
                {this.state.results.map((data) => <li><ResultsWNav id={data.id_box} order={data.Order} suborder={data.subOrder} family={data.Family} subfamily={data.subFamily} genus={data.Genus} subgenus={data.subGenus} species={data.Species} subspecies={data.subSpecies} tribu={data.Tribu}></ResultsWNav></li>)}
            </ul>
            </>
        );
    }
}

export default Selection;
