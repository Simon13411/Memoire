import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';

class Results extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.navigate(`/box/${this.props.id}`)
    }

    render() {
        return(
            <Box sx={{m:1, border: 1, borderColor: 'green'}}>
                {(this.props.id) ?
                    (<div>Boite n°: {this.props.id}</div>)
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
                {(this.props.kk) ?
                    (<div>kk: {this.props.kk}</div>)
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
    return <Results navigate={navigate} {...props}></Results>
}

export default Results;