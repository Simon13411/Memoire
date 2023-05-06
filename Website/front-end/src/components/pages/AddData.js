import React from 'react';
import Navbar from '../Navbar';
import FileUploader from '../FileUploader';
import FileDownloader from '../FileDownloader';

import {Navigate} from 'react-router-dom';


class AddData extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            uploadstate: ''
        }
    }

    Changeboxuploadstate = (message) => {
        this.setState({boxuploadstate: message})
    }

    Changeindivuploadstate = (message) => {
        this.setState({indivuploadstate: message})
    }

    render() {
        return (
        <>
        {this.props.isAuthenticated() ? 
            (
            <div>
                <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
                <div className="container">
                    <div className="column">
                        <h1>Instructions</h1>
                        <div>
                            <FileDownloader path='/getscriptinstructions' filename='instructions.pdf' type='instructions'/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="column">
                        <h1>Upload Boxes</h1>
                        <div>
                            <FileUploader type='Box' path='/csvtosql'/>
                        </div>
                        <div>
                            <FileDownloader path='/boxestemplate' filename='Boxes.xlsx' type='template'/>
                        </div>
                    </div>
                    <div className="column">
                        <h1>Upload Individuals</h1>
                        <div>
                            <FileUploader type='Individual' path='/csvtosql'/>
                        </div>
                        <div>
                            <FileDownloader path= '/individualstemplate' filename='Individuals.xlsx' type='template'/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="column">
                        <h1>Download Boxes Data</h1>
                        <FileDownloader path='/boxessqltocsv' filename='BoxesData.xlsx' type='data'/>
                    </div>
                    <div className="column">
                        <h1>Download Individuals Data</h1>
                        <FileDownloader path='/individualssqltocsv' filename='IndividualsData.xlsx' type='data'/>
                    </div>
                </div>
            </div>
            ) : (
                <Navigate to='/sign-in' />
            )
        }
        </>
        );
    }
}

export default AddData;
