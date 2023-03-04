import * as React from 'react';
import Navbar from '../Navbar';
import {Navigate} from 'react-router-dom';

class AdminPannel extends React.Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <>
        {this.props.isAuthenticated() ? 
            (
                <Navbar />
            ) : 
                <Navigate to='/sign-in' />
            
        }
        </>
    )}
}


export default AdminPannel;