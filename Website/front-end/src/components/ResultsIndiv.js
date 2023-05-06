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
                {(this.props.toShow[0]===1) && <TableCell>{this.props.id_box}</TableCell>}
                {(this.props.toShow[1]===1) && <TableCell>{this.props.Order}</TableCell>}
                {(this.props.toShow[2]===1) && <TableCell>{this.props.subOrder}</TableCell>}
                {(this.props.toShow[3]===1) && <TableCell>{this.props.Family}</TableCell>}
                {(this.props.toShow[4]===1) && <TableCell>{this.props.subFamily}</TableCell>}
                {(this.props.toShow[5]===1) && <TableCell>{this.props.Tribu}</TableCell>}
                {(this.props.toShow[6]===1) && <TableCell>{this.props.Genus}</TableCell>}
                {(this.props.toShow[7]===1) && <TableCell>{this.props.subGenus}</TableCell>}
                {(this.props.toShow[8]===1) && <TableCell>{this.props.Species}</TableCell>}
                {(this.props.toShow[9]===1) && <TableCell>{this.props.subSpecies}</TableCell>}
                <TableCell><button buttonStyle='btn--outline' onClick={this.handleClick}>Details</button></TableCell>
            </TableRow>
        )
    }

}

export function ResultsWNav(props) {
    const navigate = useNavigate()
    return <ResultsIndiv navigate={navigate} {...props}></ResultsIndiv>
}
