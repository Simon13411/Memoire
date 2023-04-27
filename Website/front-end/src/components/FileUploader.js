import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Cookies from 'js-cookie';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadstate: ''
        };
    }


    Changeuploadstate = (message) => {
        this.setState({uploadstate: message})
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
        const authToken = Cookies.get('auth_token');

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        this.Changeuploadstate('Veuillez Patienter...')

        axios.put(`${url}${this.props.path}?type=${this.props.type}&token=${authToken}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' //Contient des données binaires
            }
        })
        .then(response => {
            console.log('Fichier envoyé avec succès');
            this.Changeuploadstate('Fichier envoyé avec succès')
        })
        .catch(err => {
            console.error('Erreur lors de l\'envoi du fichier', err);
            if (!err.response) {
                this.Changeuploadstate('Erreur Serveur - Gateway')
            }
            else {
                try {
                    let jsonData = JSON.parse(err.response.data.error);
                    this.Changeuploadstate(jsonData)
                }
                catch (e) {
                    console.log(e)
                    this.Changeuploadstate(err.response.data.error)
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
                {typeof this.state.uploadstate === "object" ? 
                    (
                        <div>
                            <div>{this.state.uploadstate.type}</div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}><TableContainer sx={{ maxHeight: 150, maxWidth:1/2 }}>
                                    {Object.keys(this.state.uploadstate).length === 2 ?
                                    (
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Lines</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.uploadstate.lines.map((errl, index) => <TableRow key={index}><TableCell>{errl}</TableCell></TableRow>)}
                                            </TableBody>
                                        </Table>
                                    ):(
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Lines</TableCell>
                                                    <TableCell>Errors</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.uploadstate.lines.map((errl, index) => <TableRow key={index}><TableCell>{errl}</TableCell><TableCell>{this.state.uploadstate.errors[index]}</TableCell></TableRow>)}
                                            </TableBody>
                                        </Table>
                                    )}
                            </TableContainer></div>
                        </div>
                    ) : (
                        <></>
                    )
                }
                {typeof this.state.uploadstate === "string" ? 
                    (
                        <div>
                            {this.state.uploadstate}
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        );
    }
}

export default FileUploader;
