import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios'
const url = 'http://localhost:4000'

class Results extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Box sx={{m:1, border: 1, borderColor: 'green'}}>
                <div>{this.props.order}</div>
                <div>{this.props.suborder}</div>
            </Box>
        )
    }

}

export default Results;