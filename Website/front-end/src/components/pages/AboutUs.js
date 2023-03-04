import * as React from 'react';
import Navbar from '../Navbar';
import './Details.css';

class AboutUs extends React.Component {
    constructor (props) {
      super(props)
    }

    render() {
        return (
            <>
            <Navbar />
                <div className="contact-container">
                <h2>Contact Us</h2>
                    <div className="contact-info">
                        <p><strong>Company Name:</strong> My Group</p>
                        <p><strong>Phone Number:</strong> 123-456-7890</p>
                        <p><strong>Email:</strong> contact@mygroup.com</p>
                        <p><strong>Address:</strong> 123 Main St, Anytown USA</p>
                    </div>
                </div>
            </>
        );
    }
            
}

export default AboutUs;