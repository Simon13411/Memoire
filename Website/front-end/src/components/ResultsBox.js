import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';

class ResultsBox extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.navigate(`/box?id=${this.props.id}`)
    }

    render() {
        return(
            <Box sx={{m:1, border: 1, borderColor: 'green'}}>
                {(this.props.id) ?
                    (<div>Box n°: {this.props.id}</div>)
                    :
                    (<></>)
                }
                {(this.props.order) ?
                    (<div>Order: {this.props.order}</div>)
                    :
                    (<></>)
                }
                {(this.props.suborder) ?
                    (<div>Suborder: {this.props.suborder}</div>)
                    :
                    (<></>)
                }
                {(this.props.family) ?
                    (<div>Family: {this.props.family}</div>)
                    :
                    (<></>)
                }
                {(this.props.subfamily) ?
                    (<div>Subfamily: {this.props.subfamily}</div>)
                    :
                    (<></>)
                }
                {(this.props.tribu) ?
                    (<div>Subfamily: {this.props.tribu}</div>)
                    :
                    (<></>)
                }
                {(this.props.genus) ?
                    (<div>Genus: {this.props.genus}</div>)
                    :
                    (<></>)
                }
                {(this.props.subgenus) ?
                    (<div>Subgenus: {this.props.subgenus}</div>)
                    :
                    (<></>)
                }
                {(this.props.species) ?
                    (<div>Species: {this.props.species}</div>)
                    :
                    (<></>)
                }
                {(this.props.subspecies) ?
                    (<div>Subspecies: {this.props.subspecies}</div>)
                    :
                    (<></>)
                }
                <button buttonStyle='btn--outline' onClick={this.handleClick}>Details</button>
            </Box>
        )
    }

}

export function ResultsWNav(props) {
    const navigate = useNavigate()
    return <ResultsBox navigate={navigate} {...props}></ResultsBox>
}