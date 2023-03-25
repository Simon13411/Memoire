import React from 'react';
import Navbar from '../Navbar';
import FileUploader from '../FileUploader';
import FileDownloader from '../FileDownloader';

import {Navigate} from 'react-router-dom';


class AddData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boxuploadstate: '',
      indivuploadstate: ''
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
              <h1>Boxes</h1>
              <div>
                <FileUploader type='Box' Changeboxuploadstate={this.Changeboxuploadstate}/>
              </div>
              <div>
                <FileDownloader type='Box'/>
              </div>
              <div>
                {this.state.boxuploadstate}
              </div>
            </div>
            <div className="column">
              <h1>Individuals</h1>
              <div>
                <FileUploader type='Individual' Changeindivuploadstate={this.Changeindivuploadstate}/>
              </div>
              <div>
                <FileDownloader type='Individual'/>
              </div>
              <div>
                {this.state.indivuploadstate}
              </div>
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
