const axios = require('axios')

const express = require('express')
const app = express.Router()

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

//IP of different microservices
const IP_DBOPS = process.env.IPDBOPS
const IP_DLDER = process.env.IPDLDER
const IP_LOGIN = process.env.IPLOGIN
const IP_PICTU = process.env.IPPICTURES  


//DBOps
app.get('/get_boxdetails', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_boxdetails?id=${req.query.id}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_indivdetails', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_indivdetails?id=${req.query.id}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_boxresult', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_boxresult?offs=${req.query.offs}&o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_indivresult', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_indivresult?offs=${req.query.offs}&o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectiono', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectiono?so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectionso', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectionso?o=${req.query.o}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectiong', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectiong?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectionsg', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectionsg?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectionf', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectionf?o=${req.query.o}&so=${req.query.so}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectionsf', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectionsf?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selections', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selections?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectionss', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectionss?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_selectiont', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_selectiont?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_borrowers', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_borrowers`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get('/get_collections', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_collections`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/add-attribute/:name', (req, res) => {
    const { attribute, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/add-attribute/${req.params.name}`, { attribute : attribute })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
        })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/delete-attribute/:name', (req, res) => {
    const { attribute, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/delete-attribute/${req.params.name}`, { attribute : attribute })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
        })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/addcollection', (req, res) => {
    const {collection, token} = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/addcollection`, { collection: collection })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/modifycollection', (req, res) => {
    const { collection, newname, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/modifycollection`, { collection: collection, newname: newname })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/addborrower', (req, res) => {
    const { name, mail, phone, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/addborrower`, { name: name, mail: mail, phone: phone })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.get('/get_borrowerinfo/:name', (req, res) => {
    axios.get(`http://${IP_DBOPS}/get_borrowerinfo/${req.params.name}`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/modifyborrower', (req, res) => {
    const { borrower, name, mail, phone, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/modifyborrower`, { borrower: borrower, name: name, mail: mail, phone: phone })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                });
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/changeindivboxid', (req, res) => {
    const { individ, newboxid, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyuserright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/changeindivboxid`, {individ: individ, newboxid: newboxid})
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                })
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/changeindivborrower', (req, res) => {
    const { individ, newborrower, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyuserright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/changeindivborrower`, {individ: individ, newborrower: newborrower})
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                })
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/changeboxcollection', (req, res) => {
    const { boxid, collection, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyuserright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/changeboxcollection`, {boxid: boxid, collection: collection})
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                })
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post('/changeboxborrower', (req, res) => {
    const { boxid, newborrower, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyuserright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/changeboxborrower`, { boxid: boxid, newborrower: newborrower })
                .then((resu) => {
                    res.status(200).json(resu.data);
                })
                .catch((err) => {
                    errorhandler(err, res)
                })
            })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.put('/csvtosql/:type', upload.single('file'), (req, res) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    axios.put(`http://${IP_DBOPS}/csvtosql/${req.params.type}`, formData, {
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

app.put('/csvtosqladmin/:type/:token', upload.single('file'), (req, res) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const token = req.params.token

    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.put(`http://${IP_DBOPS}/csvtosqladmin/${req.params.type}`, formData, {
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
    
})

app.get(`/boxessqltocsv`, (req, res) => {
    axios.get(`http://${IP_DBOPS}/boxessqltocsv`, { responseType: 'stream' })
        .then((response) => {
            response.data.pipe(res)
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get(`/individualssqltocsv`, (req, res) => {
    axios.get(`http://${IP_DBOPS}/individualssqltocsv`, { responseType: 'stream' })
        .then((response) => {
            response.data.pipe(res)
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/modifypopu', (req, res) => {
    axios.post(`http://${IP_DBOPS}/modifypopu`, req.body)
        .then((results) => {
            res.status(200).json({success: "ok"})
        })
        .catch((err) => {
            errorhandler(err, res)
        })
})

app.post('/addpopubox', (req, res) => {
    axios.post(`http://${IP_DBOPS}/addpopubox`, req.body)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post(`/deletepopubox`, (req, res) => {
    axios.post(`http://${IP_DBOPS}/deletepopubox`, req.body)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post(`/deletebox`, (req, res) => {
    const { id, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/deletebox`, {id: id})
            .then((results) => {
                res.status(200).json({success: "ok"})
            })
            .catch((err) => {
                errorhandler(err, res)
            })
        })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})

app.post(`/deleteindiv`, (req, res) => {
    const { id, token } = req.body
    axios.post(`http://${IP_LOGIN}/verifyadminright`, {token: token})
        .then(() => {
            axios.post(`http://${IP_DBOPS}/deleteindiv`, {id: id})
            .then((results) => {
                res.status(200).json({success: "ok"})
            })
            .catch((err) => {
                errorhandler(err, res)
            })
        })
        .catch((err1) => {
            errorhandler(err1, res)
        });
})



//FileDownloader
app.get('/boxestemplate', (req, res) => {
    axios.get(`http://${IP_DLDER}/boxestemplate`, { responseType: 'stream' })
    .then((response) => {
        response.data.pipe(res)
    })
    .catch((err) => {
        errorhandler(err, res)
    });
})

app.get('/individualstemplate', (req, res) => {
    axios.get(`http://${IP_DLDER}/individualstemplate`, { responseType: 'stream' })
    .then((response) => {
        response.data.pipe(res)
    })
    .catch((err) => {
        errorhandler(err, res)
    });
})

//LogIn and SignIn
app.post('/login', (req, res) => {
    axios.post(`http://${IP_LOGIN}/login`, req.body)
        .then((resu) => {
            res.status(200).json({ success: resu.data.success, token: resu.data.token, admin: resu.data.role});
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/signup', (req, res) => {
    axios.post(`http://${IP_LOGIN}/signup`, req.body)
        .then((resu) => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            if (err.response) {
                res.status(401).json( { err: err.response.data.error });
            }
            else {
                res.status(401).json(err);
            }
        });
})

app.post('/adminright', (req, res) => {
    axios.post(`http://${IP_LOGIN}/adminright`, req.body)
        .then((resu) => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post(`/validate-token`, (req, res) => {
    const { token } = req.body;
    axios.post(`http://${IP_LOGIN}/validate-token`, { token : token })
        .then((resu) => {
            res.status(200).json({ success: true , username: resu.data.username});
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.get(`/get-users`, (req, res) => {
    axios.get(`http://${IP_LOGIN}/get-users`)
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post(`/modifypw`, (req, res) => {
    const { username, password, token } = req.body
    axios.post(`http://${IP_LOGIN}/modifypw`, { username: username, password: password, token: token })
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post(`/modifyright`, (req, res) => {
    const { username, role, token } = req.body
    axios.post(`http://${IP_LOGIN}/modifyright`, { username: username, role: role, token: token })
        .then((resu) => {
            res.status(200).json(resu.data);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})


//Pictures
app.get(`/getpicture`, (req, res) => {
    console.log(IP_PICTU)
    console.log(req.query.type)
    console.log(req.query.id)
    axios.get(`http://${IP_PICTU}/getpicture?type=${req.query.type}&id=${req.query.id}`, { responseType: 'stream' })
    .then((response) => {
        console.log("ok")
        response.data.pipe(res)
    })
    .catch((err) => {
        console.log(err)
        errorhandler(err, res)
    });
})


//helper
function errorhandler(err, res) {
    console.log(err)
    if (err.response) {
        if (err.response.data) {
            res.status(err.response.status).json({ error: err.response.data.error });
        }
        else {
            res.status(err.response.status).json({ error: "Erreur serveur"});
        }
    }
    else {
        res.status(404).json( {error : "Erreur serveur - Inaccessible" } );
    }
}

module.exports = app
