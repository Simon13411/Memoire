import React from 'react';
import Navbar from '../Navbar';
import FileUploader from '../FileUploader';
import './AddData.css';

function AddData() {
  return (
    <>
        <Navbar />
        <div className="container">
        <div className="left-panel">
            <FileUploader />
        </div>
        <div className="right-panel">
            <h1>Contenu de la moitié droite</h1>
        </div>
        </div>
    </>
  );
}

export default AddData;
