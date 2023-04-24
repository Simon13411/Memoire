import React, { Component } from 'react';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class FileUploaderAdmin extends Component {
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

    CsvToSQL = (event) => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        const token = this.props.getToken()

        if (this.props.type === 'Box'){
            this.props.Changeboxuploadstate('Veuillez Patienter...')
        }
        else if (this.props.type === 'Individual') {
            this.props.Changeindivuploadstate('Veuillez Patienter...')
        }

        axios.put(`${url}/csvtosqladmin?type=${this.props.type}&token=${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' //Contient des données binaires
            }
        })
        .then(response => {
            console.log('Fichier envoyé avec succès');
            if (this.props.type === 'Box'){
                this.props.Changeboxuploadstate('Fichier envoyé avec succès')
            }
            else if (this.props.type === 'Individual') {
                this.props.Changeindivuploadstate('Fichier envoyé avec succès')
            }
        })
        .catch(err => {
            console.error('Erreur lors de l\'envoi du fichier', err);
            if (!err.response) {
                if (this.props.type === 'Box'){
                    this.props.Changeboxuploadstate('Erreur Serveur - Gateway')
                }
                else if (this.props.type === 'Individual') {
                    this.props.Changeindivuploadstate('Erreur Serveur - Gateway')
                }
            }
            else {
                if (this.props.type === 'Box'){
                    this.props.Changeboxuploadstate(err.response.data.error)
                }
                else if (this.props.type === 'Individual') {
                    this.props.Changeindivuploadstate(err.response.data.error)
                }
            }
        });
    }

    showbutton() {
        return (this.state.selectedFile !== null)
    }

    render() {
        return (
            <div>
                <label>
                    {this.state.fileName}
                    <input type="file" onChange={this.handleFileChange} accept=".xlsx"/>
                </label>
                {this.state.fileError && <p style={{ color: 'red' }}>{this.state.fileError}</p>}
                {this.showbutton() ? (
                    <button onClick={this.CsvToSQL}>Add Data</button>
                    ) : (
                    <></>
                    )
                }
            </div>
        );
    }
}

export default FileUploaderAdmin;
