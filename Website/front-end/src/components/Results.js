import * as React from 'react';
import Box from '@mui/material/Box';

class Results extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Box sx={{m:1, border: 1, borderColor: 'green'}}>
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
            </Box>
        )
    }

}

export default Results;