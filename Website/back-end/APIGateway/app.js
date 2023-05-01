const axios = require('axios')

const express = require('express')
const app = express.Router()
const { match } = require("path-to-regexp");

//For reading body in requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For getting files in requests
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
const FormData = require('form-data');
app.use(upload.single('file'));

//IP of different microservices
const IP_DBOPS = process.env.IPDBOPS
const IP_DLDER = process.env.IPDLDER
const IP_LOGIN = process.env.IPLOGIN
const IP_PICTU = process.env.IPPICTURES 

//Categories of client requests
const getDBOPS = ['/get_boxdetails', '/get_indivdetails', '/get_boxresult', '/get_indivresult', '/get_selectiono', '/get_selectionso',
                '/get_selectionf', '/get_selectionsf', '/get_selectiont', '/get_selectiong', '/get_selectionsg', '/get_selections', '/get_selectionss',
                '/get_borrowers', '/get_collections', '/get_borrowerinfo/:name'];

const getDBOPSwStreamReponse = ['/boxessqltocsv', '/individualssqltocsv']

const getDLDERwStreamResponse = ['/boxestemplate', '/individualstemplate', '/getscriptinstructions']

const getPICTUwStreamResponse = ['/getpicture']

const postLOGIN = ['/login', '/signup', '/adminright', '/validate-token', '/modifypw', '/modifyright']

const getLOGIN = ['/get-users']

const postDBOPSwAdminVerif = ['/add-attribute/:name', '/delete-attribute/:name', '/addcollection', '/modifycollection', '/addborrower', '/modifyborrower']

const postDBOPSwUserVerif = ['/changeindivboxid', '/verifyuserright', '/changeboxcollection', '/changeboxborrower', '/modifypopu', '/addpopubox', '/deletepopubox']

const DBOPSUpload = ['/csvtosql']

const DBOPSUploadAdmin = ['/csvtosqladmin']

everyrequests = [getDBOPS, getDBOPSwStreamReponse, getDLDERwStreamResponse, getPICTUwStreamResponse, postLOGIN, getLOGIN, postDBOPSwAdminVerif, postDBOPSwUserVerif, DBOPSUpload, DBOPSUploadAdmin]
const AllRequests = everyrequests.flat();


//Processes the request according to its category
app.use((req, res) => {
    if (getDBOPS.some(route => match(route)(req.path)) && req.method === 'GET') {
        axios.get(`http://${IP_DBOPS}${req.url}`)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (getLOGIN.some(route => match(route)(req.path)) && req.method === 'GET') {
        axios.get(`http://${IP_LOGIN}${req.url}`)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (getDBOPSwStreamReponse.some(route => match(route)(req.path)) && req.method === 'GET') {
        axios.get(`http://${IP_DBOPS}${req.url}`, { responseType: 'stream' })
        .then((response) => {
            response.data.pipe(res)
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (getDLDERwStreamResponse.some(route => match(route)(req.path)) && req.method === 'GET') {
        axios.get(`http://${IP_DLDER}${req.url}`, { responseType: 'stream' })
        .then((response) => {
            response.data.pipe(res)
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (getPICTUwStreamResponse.some(route => match(route)(req.path)) && req.method === 'GET') {
        axios.get(`http://${IP_PICTU}${req.url}`, { responseType: 'stream' })
        .then((response) => {
            response.data.pipe(res)
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (postLOGIN.some(route => match(route)(req.path)) && req.method === 'POST') {
        axios.post(`http://${IP_LOGIN}${req.url}`, req.body)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (postDBOPSwAdminVerif.some(route => match(route)(req.path)) && req.method === 'POST') {
        console.log(req.path)
        const { token, ...otherParams } = req.body;
        axios.post(`http://${IP_LOGIN}/verifyadminright`, { token })
        .then((response) => {
            axios.post(`http://${IP_DBOPS}${req.url}`, otherParams)
            .then((response2) => {
                res.status(200).json(response2.data);
            })
            .catch((err2) => {
                errorhandler(err2, res)
            });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (postDBOPSwUserVerif.some(route => match(route)(req.path)) && req.method === 'POST') {
        const { token, ...otherParams } = req.body;
        axios.post(`http://${IP_LOGIN}/verifyuserright`, { token })
        .then((response) => {
            axios.post(`http://${IP_DBOPS}${req.url}`, otherParams)
            .then((response2) => {
                res.status(200).json(response2.data);
            })
            .catch((err2) => {
                errorhandler(err2, res)
            });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
    }
    else if (DBOPSUpload.some(route => match(route)(req.path)) && req.method === 'PUT') {
        csvtosql(req, res)
    }
    else if (DBOPSUploadAdmin.some(route => match(route)(req.path)) && req.method === 'PUT') {
        csvtosqladmin(req, res)
    }
    else if (req.method === 'OPTIONS' && AllRequests.some(route => match(route)(req.path))) {
        console.log("OPTIONRECU")
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.sendStatus(200);
    }
    else {
        res.status(404);
    }
})


//csvtosql
const csvtosql = (req, res) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const token = req.query.token

    axios.post(`http://${IP_LOGIN}/verifyuserright`, {token: token})
        .then(() => {
            axios.put(`http://${IP_DBOPS}/csvtosql/${req.query.type}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' //Contient des données binaires
                    }
                })
                .then((resu) => {
                    res.status(200).json(resu.data);
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                            console.log('File removed');
                        });
                })
                .catch((err) => {
                    errorhandler(err, res)
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                            console.log('File removed');
                        });
                });
            })
        .catch((err) => {
            errorhandler(err, res)
        })
}


//DBOps requests that need user token verification
const csvtosqladmin = (req, res) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const token = req.query.token

    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
    .then(() => {
        axios.put(`http://${IP_DBOPS}/csvtosql/${req.query.type}`, formData, 
            {
                headers: {
                'Content-Type': 'multipart/form-data' //Contient des données binaires
                }
            }
        )
        .then((resu) => {
            res.status(200).json(resu.data);
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err);
                }
                    console.log('File removed');
            });
        })
        .catch((err) => {
            errorhandler(err, res)
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err);
                }
                    console.log('File removed');
            });
        });
    })
}


//helper
function errorhandler(err, res) {
    //console.log(err)
    if (err.response) {
        if (err.response.data) {
            res.status(err.response.status).json({ error: err.response.data.error });
        }
        else {
            res.status(err.response.status).json({ error: "Erreur serveur"});
        }
    }
    else {
        res.status(500).json( {error : "Erreur serveur - Inaccessible" } );
    }
}

module.exports = app
