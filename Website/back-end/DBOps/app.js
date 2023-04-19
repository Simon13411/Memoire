const db = require('./db_ops')

const express = require('express')
const app = express.Router()

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

app.get('/get_boxdetails', (req, res) => {
    const id = req.query.id
    return db.get_boxdetails(id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})


app.get('/get_boxresult', (req, res) => {
    const Offs = req.query.offs
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_boxresult(Offs, O, So, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.get('/get_indivdetails', (req, res) => {
    const id = req.query.id
    return db.get_indivdetails(id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})


app.get('/get_indivresult', (req, res) => {
    const Offs = req.query.offs
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_indivresult(Offs, O, So, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Order Selection choices
app.get('/get_selectiono', (req, res) => {
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectiono(So, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Suborder Selection choices
app.get('/get_selectionso', (req, res) => {
    const O = req.query.o
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectionso(O, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Genus Selection choices
app.get('/get_selectiong', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectiong(O, So, F, Sf, T, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//SubGenus Selection choices
app.get('/get_selectionsg', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectionsg(O, So, F, Sf, T, G, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Family Selection choices
app.get('/get_selectionf', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectionf(O, So, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Subfamily Selection choices
app.get('/get_selectionsf', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectionsf(O, So, F, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Species Selection choices
app.get('/get_selections', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const Ss = req.query.ss
    return db.get_selections(O, So, F, Sf, T, G, Sg, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Subspecies Selection choices
app.get('/get_selectionss', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const T = req.query.t
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    return db.get_selectionss(O, So, F, Sf, T, G, Sg, S)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Subspecies Selection choices
app.get('/get_selectiont', (req, res) => {
    const O = req.query.o
    const So = req.query.so
    const F = req.query.f
    const Sf = req.query.sf
    const G = req.query.g
    const Sg = req.query.sg
    const S = req.query.s
    const Ss = req.query.ss
    return db.get_selectiont(O, So, F, Sf, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Get all Loaners
app.get('/get_loaners', (req, res) => {
    return db.get_loaners()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Get all collections
app.get('/get_collections', (req, res) => {
    return db.get_collections()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/add-attribute/:name', (req, res) => {
    console.log("Here1")
    const { attribute, token } = req.body
    console.log("Here2")
    return db.addattribute(req.params.name, attribute, token)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/delete-attribute/:name', (req, res) => {
    const { attribute, token } = req.body
    return db.deleteattribute(req.params.name, attribute, token)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/addcollection', (req, res) => {
    const {collection} = req.body
    return db.addcollection(collection)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/modifycollection', (req, res) => {
    const { collection, newname } = req.body
    return db.modifycollection(collection, newname)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/addloaner', (req, res) => {
    const { name, mail, phone } = req.body
    return db.addloaner(name, mail, phone)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.get('/get_loanerinfo/:name', (req, res) => {
    return db.getloanerinfo(req.params.name)
        .then((resu) => {
            res.status(200).json(resu);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/modifyloaner', (req, res) => {
    const { loaner, name, mail, phone } = req.body
    return db.modifyloaner(loaner, name, mail, phone)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})
    

app.post('/changeindivboxid', (req, res) => {
    const { individ, newboxid } = req.body
    return db.changeindivboxid(individ, newboxid)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/changeindivloaner', (req, res) => {
    const { individ, newloaner } = req.body
    return db.changeindivloaner(individ, newloaner)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/changeboxcollection', (req, res) => {
    const { boxid, collection } = req.body
    return db.changeboxcollection(boxid, collection)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/changeboxloaner', (req, res) => {
    const { boxid, newloaner } = req.body
    return db.changeboxloaner(boxid, newloaner)
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//CSV To SQL for Users
app.put('/csvtosql/:type', upload.single('file'), (req, res) => {
    const type = req.params.type
    console.log(req.file)

    return db.csvtosql(req.file.path, type, "false")
    .then((result) => {
        res.status(200).json(result)
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
    })
})

//CSV To SQL for Admins
app.put('/csvtosqladmin/:type', upload.single('file'), (req, res) => {
    const type = req.params.type
    console.log(req.file)

    return db.csvtosql(req.file.path, type, "true")
    .then((result) => {
        res.status(200).json(result)
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
    })
})

//SQL to Csv (Boxes)
app.get('/boxessqltocsv', (req, res) => {
    return db.SqlToCsv("Box")
    .then((result) => {
        const filePath = 'FilesToReturn/BoxesData.xlsx'; // chemin absolu du fichier
        const fileName = 'BoxesData.xlsx'; // nom du fichier à télécharger
        console.log("Recherche du fichier BoxesData.xlsx")
        const fileContent = fs.readFileSync(filePath);
        const stats = fs.statSync(filePath);
        const fileSize = stats.size;
        console.log("Fichier BoxesData.xlsx trouvé")
    
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Length', fileSize);
    
        res.send(fileContent);
        console.log("Fichier BoxesData.xlsx envoyé")

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            }
                console.log('File removed');
            });
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//SQL to Csv (Individuals)
app.get('/individualssqltocsv', (req, res) => {
    return db.SqlToCsv("Individual")
    .then((result) => {
        const filePath = 'FilesToReturn/IndividualsData.xlsx'; // chemin absolu du fichier
        const fileName = 'IndividualsData.xlsx'; // nom du fichier à télécharger
        console.log("Recherche du fichier IndividualsData.xlsx")
        const fileContent = fs.readFileSync(filePath);
        const stats = fs.statSync(filePath);
        const fileSize = stats.size;
        console.log("Fichier IndividualsData.xlsx trouvé")
    
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Length', fileSize);
    
        res.send(fileContent);
        console.log("Fichier IndividualsData.xlsx envoyé")

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            }
                console.log('File removed');
            });
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Modifypopu (Box and Indiv)
app.post('/modifypopu', (req, res) => {
    const { type, id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies, neworder, newsuborder, newfamily, newsubfamily, newtribu, newgenus, newsubgenus, newspecies, newsubspecies } = req.body
    return db.modifypopu(type, id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies, neworder, newsuborder, newfamily, newsubfamily, newtribu, newgenus, newsubgenus, newspecies, newsubspecies)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post('/addpopubox', (req, res) => {
    const { id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies} = req.body
    return db.addpopubox(id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

//Deletepopubox
app.post(`/deletepopubox`, (req, res) => {
    const { id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies } = req.body
    return db.deletepopubox(id, order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post(`/deletebox`, (req, res) => {
    const { id } = req.body
    return db.deletebox(id)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})

app.post(`/deleteindiv`, (req, res) => {
    const { id } = req.body
    return db.deleteindiv(id)
    .then((results) => {
        res.status(200).json({success: "ok"})
    })
    .catch((err) => {
        errorhandler(err, res)
    })
})


//Helper for errors
function errorhandler(err, res) {
    console.log(err)
    if (err.message) {
        res.status(404).json({ error: err.message });
    }
    else {
        res.status(404).json( {error : "Erreur Back-end DBOps" } );
    }
  }

module.exports = app