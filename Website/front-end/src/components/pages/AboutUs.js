import * as React from 'react';
import Navbar from '../Navbar';

class AboutUs extends React.Component {
    constructor (props) {
      super(props)
    }

    render() {
        return (
            <>
            <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div>
                <h2>Contact Us</h2>
                    <div>
                        <p><strong>University:</strong> ULiege</p>
                        <p><strong>Faculty:</strong> Gembloux</p>
                        <p><strong>Departement:</strong> Entomologie</p>
                        <p><strong>Phone Number:</strong> </p>
                        <p><strong>Email:</strong> gregoire.noel@uliege.be</p>
                        <p><strong>Address:</strong> </p>
                    </div>
                </div>
            </>
        );
    }
            
}

export default AboutUs;