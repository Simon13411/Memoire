import React from 'react';
import Navbar from '../Navbar';
import FileUploader from '../FileUploader';
import FileDownloader from '../FileDownloader';

import {Navigate} from 'react-router-dom';


class AddData extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <>
      {this.props.isAuthenticated() ? 
        (
        <div>
            <Navbar />
            <div className="container">
            <div className="column">
              <h1>Boxes</h1>
              <div>
                <FileUploader />
              </div>
              <div>
                <FileDownloader file='Box'/>
              </div>
            </div>
            <div className="column">
              <h1>Individuals</h1>
              <div>
                <FileUploader/>
              </div>
              <div>
                <FileDownloader file='Individual'/>
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
