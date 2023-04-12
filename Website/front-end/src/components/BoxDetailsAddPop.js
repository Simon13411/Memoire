import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetailsAddPop extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            order: null,
            suborder: null,
            genus: null,
            subgenus: null,
            family: null,
            subfamily: null,
            species: null,
            subspecies: null,
            tribu: null,
            orderlist: [],
            suborderlist: [],
            genuslist: [],
            subgenuslist: [],
            familylist: [],
            subfamilylist: [],
            specieslist: [],
            subspecieslist: [],
            tribulist: [],
            addstate: ''
        }
    }

    componentDidMount() {
        this.get_selection()
    }

    get_selection = () => {
        axios.get(`${url}/get_selectiono`, {
          params:
          {so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({orderlist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionso`, {
          params:
          {o: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({suborderlist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectiong`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({genuslist: res.data.rows,})
        })
    
        axios.get(`${url}/get_selectionsg`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({subgenuslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionf`, {
          params:
          {o: 'NULL', so: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({familylist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionsf`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({subfamilylist: res.data.rows})
        })
    
        axios.get(`${url}/get_selections`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({specieslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectionss`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL'}})
            .then((res) => {
            this.setState({subspecieslist: res.data.rows})
        })
    
        axios.get(`${url}/get_selectiont`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({tribulist: res.data.rows})
        })

      }
    
    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    addpopu = () => {
        this.setState({addstate: 'Add in progress...'})
        axios.post(`${url}/addpopubox`, {id: this.props.id, order: this.state.order, suborder: this.state.suborder, 
                                        family: this.state.family, subfamily: this.state.subfamily, tribu: this.state.tribu, 
                                        genus: this.state.genus, subgenus: this.state.subgenus, species: this.state.species, 
                                        subspecies: this.state.subspecies})
            .then((res) => {
                this.setState({changestate: 'Population has been added'}, this.props.refresh)
            })
            .catch((err) => {
                if (!err.response) {
                  this.setState({changestate: 'Erreur Serveur - Gateway'})
                }
                else {
                  this.setState({changestate: err.response.data.error})
                }
            })
    }

    render() {
        return (
            <div className="column">
                <div>
                <h2 className="title">Add Population</h2>
                {this.state.addstate}
                <h4 className="title">Order</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="order-select"
                        value={this.state.order}
                        onChange={this.handleInputChange}
                        name="order"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Suborder</h4>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="suborder-select"
                        value={this.state.suborder}
                        onChange={this.handleInputChange}
                        name="suborder"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.suborderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Genus</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="genus-select"
                        value={this.state.genus}
                        onChange={this.handleInputChange}
                        name="genus"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.genuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4  className="title">Subgenus</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="subgenus-select"
                        value={this.state.subgenus}
                        onChange={this.handleInputChange}
                        name="subgenus"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subgenuslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Family</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="family-select"
                        value={this.state.family}
                        onChange={this.handleInputChange}
                        name="family"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.familylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Subfamily</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="subfamily-select"
                        value={this.state.subfamily}
                        onChange={this.handleInputChange}
                        name="subfamily"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subfamilylist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Species</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="species-select"
                        value={this.state.species}
                        onChange={this.handleInputChange}
                        name="species"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.specieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Subspecies</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="subspecies-select"
                        value={this.state.subspecies}
                        onChange={this.handleInputChange}
                        name="subspecies"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.subspecieslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                <h4 className="title">Tribu</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="tribu-select"
                        value={this.state.tribu}
                        onChange={this.handleInputChange}
                        name="tribu"
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {this.state.tribulist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <button type='submit' onClick={this.addpopu}>Ajouter une population</button>
                </div>
            </div>
        )
    }
}

export default BoxDetailsAddPop;