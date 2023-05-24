import React from 'react';

import Navbar from '../components/Navbar';
import Selection from '../components/SelectionIndiv';

function InsectHome(props) {
    return (
        <>
            <Navbar isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} Logout={props.Logout}/>
            <Selection> </Selection>
        </>
    )
}

export default InsectHome;