import React from 'react';
import Navbar from '../Navbar';
import FileUploader from '../FileUploader';
import FileDownloader from '../FileDownloader';
import './AddData.css';

function AddData() {
  return (
    <div>
        <Navbar />
        <div className="container">
        <div className="left-panel">
          <h1 className='title'>Boxes</h1>
          <div className="file-uploader">
            <FileUploader />
          </div>
          <div className="file-dwnloader">
            <FileDownloader file='Box'/>
          </div>
        </div>
        <div className="right-panel">
          <h1 className='title'>Individuals</h1>
          <div className="file-uploader">
            <FileUploader/>
          </div>
          <div className="file-dwnloader">
            <FileDownloader file='Individual'/>
          </div>
        </div>
        </div>
    </div>
  );
}

export default AddData;
