import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

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
            maxpage: 0,
            page: 0,
            rowsPerPage: 10,
            nresults: 0
        }
    }

    isselectionempty() {
        return (this.state.order === 'NULL' && this.state.suborder === 'NULL' && this.state.genus === 'NULL' && this.state.subgenus === 'NULL' 
            && this.state.family === 'NULL' && this.state.subfamily === 'NULL' && this.state.species === 'NULL' && this.state.subspecies === 'NULL')
    }

    fetchResults = () => {
        axios.get(`${url}/get_boxresult`, {
            params:
            {offs: (this.state.page*this.state.rowsPerPage).toString(), limit:this.state.rowsPerPage, o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
        .then((res) => {
            this.setState({results: res.data.rows})
            if (res.data.rows.length > 0) {
                this.setState({maxpage: Math.floor(parseInt(res.data.rows[0].total_rows)/10), nresults: res.data.rows[0].total_rows})
            }
            else {
                this.setState({maxpage: 0, nresults: 0})
            }
        })
    }

    fetchResultsOnClick = () => {
        this.setState({page: 0}, this.fetchResults)
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
        }, this.get_selection)
    }
  
    componentDidMount() {
        axios.get(`${url}/get_boxresult`, {
            params:
            {offs: (this.state.page*10).toString(), limit:this.state.rowsPerPage, o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
        .then((res) => {
            this.setState({results: res.data.rows})
            if (res.data.rows[0].total_rows) {
                this.setState({maxpage: Math.floor(parseInt(res.data.rows[0].total_rows)/10), nresults: res.data.rows[0].total_rows})
            }
            else {
                this.setState({maxpage: 0})
            }
        })
        this.get_selection()
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage}, this.fetchResults);
    };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value}, this.fetchResultsOnClick)
    };
    

    render() {
        return(
            <div cassname="containerhome">
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
                    <InputLabel id="demo-simple-select-label">Subgenus</InputLabel>
                    <Select value={this.state.subgenus} name="subgenus" label="subGenus" onChange={this.handleAttributeChange}>
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">species</InputLabel>
                    <Select value={this.state.species} name="species" label="Species" onChange={this.handleAttributeChange}>
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">subspecies</InputLabel>
                    <Select value={this.state.subspecies} name="subspecies" label="Species" onChange={this.handleAttributeChange} >
                        <MenuItem value='NULL'>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    </Select>
            </FormControl>
            </div>
            <div classname="datalist">
                <TableContainer sx={{width:'auto', flex:1}}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Boite</TableCell>
                        <TableCell>Collection</TableCell>
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
                        {this.state.results.map((row) => (
                        <ResultsWNav id_box={row.id_box} Collection={row.collection} Order={row.Order} subOrder={row.subOrder} Family={row.Family} subFamily={row.subFamily} Genus={row.Genus}
                                    subGenus={row.subGenus} Species={row.Species} subSpecies={row.subSpecies} Tribu={row.Tribu}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={this.state.nresults}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </div>
            </div>
        );
    }
}

export default Selection;
