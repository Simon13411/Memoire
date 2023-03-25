import * as React from 'react';
import Navbar from '../Navbar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetailsAdmin extends React.Component {

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
    
    OrderChange = (event) => {
        this.setState({order: event.target.value})
    }

    render() {
        return (
            <>
            <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
            <div className="container">
                <div>
                <p className="title">Order</p>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                    <Select
                    labelId="order-label"
                    id="order-select"
                    value={this.state.order}
                    label="Order"
                    onChange={this.OrderChange}
                    >
                    {this.state.orderlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                    <MenuItem value={"Hymenoptera"}>Hymenoptera</MenuItem>
                    <MenuItem value={"Lepidoptera"}>Lepidoptera</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div>
                <p className="title">Suborder</p>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Suborder</InputLabel>
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
                    </Select>
                </FormControl>
                </div>
                <div>
                <p className="title">Genus</p>
                {(this.state.genus) ?
                    (<p>{this.state.genus}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p  className="title">Subgenus</p>
                {(this.state.subgenus) ?
                    (<p>{this.state.subgenus}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Family</p>
                {(this.state.family) ?
                    (<p>{this.state.family}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Subfamily</p>
                {(this.state.subfamily) ?
                    (<p>{this.state.subfamily}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Species</p>
                {(this.state.species) ?
                    (<p>{this.state.species}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Subspecies</p>
                {(this.state.subspecies) ?
                    (<p>{this.state.subspecies}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Tribus</p>
                {(this.state.tribus) ?
                    (<p>{this.state.tribus}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Loaner</p>
                {(this.state.loaner) ?
                    (<p>{this.state.loaner}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Range</p>
                {(this.state.rangebegin) ?
                    (<p>{this.state.rangebegin}-{this.state.rangeend}</p>)
                    :
                    (<></>)
                }
                </div>
                <div>
                <p className="title">Collection</p>
                {(this.state.rangebegin) ?
                    (<p>{this.state.collection}</p>)
                    :
                    (<></>)
                }
                </div>
            </div>
            </>
        )
    }
}

export default BoxDetailsAdmin;