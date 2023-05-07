import * as React from 'react';

import { TableCell, TableRow } from '@mui/material';

class BoxAttributes extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            order: this.props.order,
            suborder: this.props.suborder,
            family: this.props.family,
            subfamily: this.props.subfamily,
            tribu: this.props.tribu,
            genus: this.props.genus,
            subgenus: this.props.subgenus,
            species: this.props.species,
            subspecies: this.props.subspecies
        }
    }

    render() {
        return (
            <TableRow key={this.props.index}>
                <TableCell>{this.props.index+1}</TableCell>
                <TableCell>{this.props.order}</TableCell>
                <TableCell>{this.props.suborder}</TableCell>
                <TableCell>{this.props.family}</TableCell>
                <TableCell>{this.props.subfamily}</TableCell>
                <TableCell>{this.props.tribu}</TableCell>
                <TableCell>{this.props.genus}</TableCell>
                <TableCell>{this.props.subgenus}</TableCell>
                <TableCell>{this.props.species}</TableCell>
                <TableCell>{this.props.subspecies}</TableCell>
            </TableRow>
            )
        }
}

export default BoxAttributes;