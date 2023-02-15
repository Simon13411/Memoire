import React, { Component } from 'react';

import axios from 'axios'
const url = 'http://localhost:4000'

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.setState({
        selectedFile: file
      });
    } else {
      this.setState({
        fileError: 'Le fichier doit être de type .xlsx',
      });
    }
  };

  handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.setState({
        selectedFile: file
      });
    } else {
      this.setState({
        fileError: 'Le fichier doit être de type .xlsx',
      });
    }
  };

  CsvToSQL = (event) => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    axios.put(`http://localhost:4001/csvtosql`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' //Contient des données binaires
      }
    })
      .then(response => {
        console.log('Fichier envoyé avec succès');
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi du fichier', error);
      });
  }

  showbutton() {
    return (this.state.selectedFile !== null)
  }

  render() {
    return (
      <div onDrop={this.handleFileDrop} onDragOver={(e) => e.preventDefault()}>
        <label>
          {this.state.fileName}
          <input type="file" onChange={this.handleFileChange} accept=".xlsx" />
        </label>
        {this.state.fileError && <p style={{ color: 'red' }}>{this.state.fileError}</p>}
        {
          this.showbutton ? (
            <button buttonStyle='btn--outline' onClick={this.CsvToSQL}>Add Data</button>
          ) : (
            <></>
          )
        }
      </div>
    );
  }
}

export default FileUploader;
