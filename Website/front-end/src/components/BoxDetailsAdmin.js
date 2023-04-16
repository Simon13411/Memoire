import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetailsAdmin extends React.Component {

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
            changestate: '',
            deletestate: ''
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
            this.setState({orderlist: res.data.rows}, this.setState({order: this.props.order, actualorder: this.props.order}))
        })
    
        axios.get(`${url}/get_selectionso`, {
          params:
          {o: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({suborderlist: res.data.rows, suborder: this.props.suborder, actualsuborder: this.props.suborder})
        })
    
        axios.get(`${url}/get_selectiong`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({genuslist: res.data.rows, genus: this.props.genus, actualgenus: this.props.genus})
        })
    
        axios.get(`${url}/get_selectionsg`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({subgenuslist: res.data.rows, subgenus: this.props.subgenus, actualsubgenus: this.props.subgenus})
        })
    
        axios.get(`${url}/get_selectionf`, {
          params:
          {o: 'NULL', so: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({familylist: res.data.rows, family: this.props.family, actualfamily: this.props.family})
        })
    
        axios.get(`${url}/get_selectionsf`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({subfamilylist: res.data.rows, subfamily: this.props.subfamily, actualsubfamily: this.props.subfamily})
        })
    
        axios.get(`${url}/get_selections`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({specieslist: res.data.rows, species: this.props.species, actualspecies: this.props.species})
        })
    
        axios.get(`${url}/get_selectionss`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', t: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL'}})
            .then((res) => {
            this.setState({subspecieslist: res.data.rows, subspecies: this.props.subspecies, actualsubspecies: this.props.subspecies})
        })
    
        axios.get(`${url}/get_selectiont`, {
          params:
          {o: 'NULL', so: 'NULL', f: 'NULL', sf: 'NULL', g: 'NULL', sg: 'NULL', s: 'NULL', ss: 'NULL'}})
            .then((res) => {
            this.setState({tribulist: res.data.rows, tribu: this.props.tribu, actualtribu: this.props.tribu})
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

    modify = () => {
        const verif = this.props.maxPopDegree([this.state.order, this.state.suborder, this.state.family, this.state.subfamily, 
            this.state.tribu, this.state.genus, this.state.subgenus,this.state.species, this.state.subspecies])
        if (verif !== "ok") {
            this.setState({changestate: verif})
        }
        else {
            this.setState({changestate: 'Change in progress...'})
            axios.post(`${url}/modifypopu`, {type: "Box", id: this.props.id, order: this.props.order, suborder: this.props.suborder, 
                                            family: this.props.family, subfamily: this.props.subfamily, tribu: this.props.tribu, 
                                            genus: this.props.genus, subgenus: this.props.subgenus, species: this.props.species, 
                                            subspecies: this.props.subspecies, neworder: this.state.order, newsuborder: this.state.suborder, 
                                            newfamily: this.state.family, newsubfamily: this.state.subfamily, newtribu: this.state.tribu, 
                                            newgenus: this.state.genus, newsubgenus: this.state.subgenus, 
                                            newspecies: this.state.species, newsubspecies: this.state.subspecies})
                .then((res) => {
                    this.setState({changestate: 'Population has been changed with success'}, this.props.changefetchedpop(this.state))
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
    }

    delete = () => {
        this.setState({deletestate: 'Delete in progress...'})
        axios.post(`${url}/deletepopubox`, {id: this.props.id, order: this.props.order, suborder: this.props.suborder, 
                                        family: this.props.family, subfamily: this.props.subfamily, tribu: this.props.tribu, 
                                        genus: this.props.genus, subgenus: this.props.subgenus, species: this.props.species, 
                                        subspecies: this.props.subspecies})
            .then((res) => {
                this.setState({deletestate: 'Population has been deleted with success'}, this.props.refresh)
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
            <div className="column">
                <div>
                <h2 className="title">Delete Popu n°{this.props.index+1}</h2>
                {this.state.deletestate}
                <div>
                    <button type='submit' onClick={this.delete}>Delete population</button>
                </div>
                <h2 className="title">Modify Popu n°{this.props.index+1}</h2>
                {this.state.changestate}
                <h4 className="title">Order</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                        <Select
                        id="order-select"
                        value={this.state.order}
                        onChange={this.handleInputChange}
                        name="order"
                        >
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
                    <button type='submit' onClick={this.modify}>Modify population</button>
                </div>
            </div>
        )
    }
}

export default BoxDetailsAdmin;