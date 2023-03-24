import React from 'react';

import Navbar from '../Navbar';
import Selection from '../Selection';

function InsectHome(props) {
    return (
        <>
        <Navbar isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} Logout={props.Logout}/>
        
        <Selection> </Selection>
        </>
    )
}

export default InsectHome;