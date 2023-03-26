const express = require('express')

const app = express.Router()
const db = require('./db_ops')

const multer = require('multer')
//Multer options
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
    })
})

app.get('/get_indivdetails', (req, res) => {
    const id = req.query.id
    return db.get_indivdetails(id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
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
        res.status(404).json({error: err.message})
    })
})

//Get all Loaners
app.get('/get_loaners', (req, res) => {
    return db.get_loaners()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
    })
})

//Get all collections
app.get('/get_collections', (req, res) => {
    return db.get_collections()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
    })
})

//CSV To SQL for Users
app.put('/csvtosql/:type', upload.single('file'), (req, res) => {
    const type = req.params.type
    return db.csvtosql(req.file.path, type)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
    })
})

//SQL to Csv (Boxes)
app.get('/boxessqltocsv', (req, res) => {
    return db.boxSqlToCsv(req.file.path, type)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
    })
})

//SQL to Csv (Individuals)
app.get('/individualssqltocsv', (req, res) => {
    return db.indivSqlToCsv(req.file.path, type)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json({error: err.message})
    })
})

module.exports = app