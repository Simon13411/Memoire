import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

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
            maxpage: 0,
            page: 0,
            rowsPerPage: 10,
            nresults: 0,
            //selection
            toShow: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
        }
    }

    isselectionempty() {
        return (this.state.order === 'NULL' && this.state.suborder === 'NULL' && this.state.genus === 'NULL' && this.state.subgenus === 'NULL' 
            && this.state.family === 'NULL' && this.state.subfamily === 'NULL' && this.state.species === 'NULL' && this.state.subspecies === 'NULL')
    }

    fetchResults = () => {
        axios.get(`${url}/get_indivresult`, {
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
    
    handleCheck = (event) => {
        const target = event.target;
        const value = target.checked ? 1 : 0; //if crossed 1 if not 0
        const index = parseInt(target.name);
    
        var newToShow = this.state.toShow;
        newToShow[index] = value;
        this.setState({toShow: newToShow})
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage}, this.fetchResults);
    };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value}, this.fetchResultsOnClick)
    };
  
    componentDidMount() {
        axios.get(`${url}/get_indivresult`, {
            params:
            {offs: (this.state.page*this.state.rowsPerPage).toString(), limit:this.state.rowsPerPage, o: this.state.order, so: this.state.suborder, f: this.state.family, sf: this.state.subfamily, t: this.state.tribu, g: this.state.genus, sg: this.state.subgenus, s: this.state.species, ss: this.state.subspecies}})
        .then((res) => {
            this.setState({results: res.data.rows})
            if (res.data.rows[0].total_rows) {
                this.setState({maxpage: Math.floor(parseInt(res.data.rows[0].total_rows)/10),  nresults: res.data.rows[0].total_rows})
            }
            else {
                this.setState({maxpage: 0})
            }
        })
        this.get_selection()
    }

    render() {
        return(
        <div cassname="containerhome">
            <div className='selectdiv'>
            <button buttonStyle='btn--outline' onClick={this.fetchResultsOnClick}>SEARCH INDIVIDUALS</button>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Order</InputLabel>
                <Select value={this.state.order} label="Order" name="order" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">SubOrder</InputLabel>
                <Select value={this.state.suborder} name="suborder" label="subOrder" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Family</InputLabel>
                <Select value={this.state.family} name="family" label="family" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">SubFamily</InputLabel>
                <Select value={this.state.subfamily} name="subfamily" label="subfamily" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Tribe</InputLabel>
                <Select value={this.state.tribu} name="tribu" label="Tribu" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Genus</InputLabel>
                <Select value={this.state.genus} name="genus" label="Genus" onChange={this.handleAttributeChange} >
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">SubGenus</InputLabel>
                <Select value={this.state.subgenus} name="subgenus" label="subGenus" onChange={this.handleAttributeChange}>
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">species</InputLabel>
                <Select value={this.state.species} name="species" label="Species" onChange={this.handleAttributeChange}>
                    <MenuItem value='NULL'>
                        <em>None</em>
                    </MenuItem>
                    {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
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
                <div className='attrselect'>
                    <FormControlLabel name="0" onChange={this.handleCheck} control={<Checkbox />} label="Box" />
                    <FormControlLabel name="1" onChange={this.handleCheck} control={<Checkbox defaultChecked />} label="Order" />
                    <FormControlLabel name="2" onChange={this.handleCheck} control={<Checkbox defaultChecked />} label="Suborder" />
                    <FormControlLabel name="3" onChange={this.handleCheck} control={<Checkbox defaultChecked />} label="Family" />
                    <FormControlLabel name="4" onChange={this.handleCheck} control={<Checkbox defaultChecked />} label="Subfamily" />
                    <FormControlLabel name="5" onChange={this.handleCheck} control={<Checkbox defaultChecked />} label="Tribe" />
                    <FormControlLabel name="6" onChange={this.handleCheck} control={<Checkbox />} label="Genus" />
                    <FormControlLabel name="7" onChange={this.handleCheck} control={<Checkbox />} label="Subgenus" />
                    <FormControlLabel name="8" onChange={this.handleCheck} control={<Checkbox />} label="species" />
                    <FormControlLabel name="9" onChange={this.handleCheck} control={<Checkbox />} label="subspecies" />
                </div>
                <TableContainer sx={{width:'auto', flex:1}}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>SpeciCode</TableCell>
                        {(this.state.toShow[0]===1) && <TableCell>Box</TableCell>}
                        {(this.state.toShow[1]===1) && <TableCell>Order</TableCell>}
                        {(this.state.toShow[2]===1) && <TableCell>Suborder</TableCell>}
                        {(this.state.toShow[3]===1) && <TableCell>Family</TableCell>}
                        {(this.state.toShow[4]===1) && <TableCell>Subfamily</TableCell>}
                        {(this.state.toShow[5]===1) && <TableCell>Tribe</TableCell>}
                        {(this.state.toShow[6]===1) && <TableCell>Genus</TableCell>}
                        {(this.state.toShow[7]===1) && <TableCell>Subgenus</TableCell>}
                        {(this.state.toShow[8]===1) && <TableCell>species</TableCell>}
                        {(this.state.toShow[9]===1) && <TableCell>subspecies</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.results.map((row) => (
                        <ResultsWNav toShow={this.state.toShow} id_box={row.box_id} id={row.id_individu} Order={row.Order} subOrder={row.subOrder} Family={row.Family} subFamily={row.subFamily} Genus={row.Genus}
                                    subGenus={row.subGenus} Species={row.Species} subSpecies={row.subSpecies} Tribu={row.Tribu}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
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
