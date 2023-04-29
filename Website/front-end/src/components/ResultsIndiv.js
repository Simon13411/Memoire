import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import { TableCell, TableRow } from '@mui/material';

class ResultsIndiv extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.navigate(`/individual?id=${this.props.id}`)
    }

    render() {
        return(
            <TableRow key={this.props.id}>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.id_box}</TableCell>
                <TableCell>{this.props.Order}</TableCell>
                <TableCell>{this.props.subOrder}</TableCell>
                <TableCell>{this.props.Family}</TableCell>
                <TableCell>{this.props.subFamily}</TableCell>
                <TableCell>{this.props.Tribu}</TableCell>
                <TableCell>{this.props.Genus}</TableCell>
                <TableCell>{this.props.subGenus}</TableCell>
                <TableCell>{this.props.Species}</TableCell>
                <TableCell>{this.props.subSpecies}</TableCell>
                <TableCell><button buttonStyle='btn--outline' onClick={this.handleClick}>Details</button></TableCell>
            </TableRow>
        )
    }

}

export function ResultsWNav(props) {
    const navigate = useNavigate()
    return <ResultsIndiv navigate={navigate} {...props}></ResultsIndiv>
}
