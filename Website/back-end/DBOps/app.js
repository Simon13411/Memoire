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

app.get('/get_all', (req, res) => {
    return db.get_all()
    .then((result) => {
        console.log(result.rows[0].Att1)
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})


app.get('/get_result/:offset/:o/:so/:f/:sf/:g/:sg/:s/:ss/:t', (req, res) => {
    const Offs = req.params.offset
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_result(Offs, O, So, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Order Selection choices
app.get('/get_selectiono/:so/:f/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectiono(So, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Suborder Selection choices
app.get('/get_selectionso/:o/:f/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    const O = req.params.o
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectionso(O, F, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Genus Selection choices
app.get('/get_selectiong/:o/:so/:f/:sf/:t/:sg/:s/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectiong(O, So, F, Sf, T, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//SubGenus Selection choices
app.get('/get_selectionsg/:o/:so/:f/:sf/:t/:g/:s/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectionsg(O, So, F, Sf, T, G, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Family Selection choices
app.get('/get_selectionf/:o/:so/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectionf(O, So, Sf, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Subfamily Selection choices
app.get('/get_selectionsf/:o/:so/:f/:t/:g/:sg/:s/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectionsf(O, So, F, T, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Species Selection choices
app.get('/get_selections/:o/:so/:f/:sf/:t/:g/:sg/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const Ss = req.params.ss
    return db.get_selections(O, So, F, Sf, T, G, Sg, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Subspecies Selection choices
app.get('/get_selectionss/:o/:so/:f/:sf/:t/:g/:sg/:s', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const T = req.params.t
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    return db.get_selectionss(O, So, F, Sf, T, G, Sg, S)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

//Subspecies Selection choices
app.get('/get_selectiont/:o/:so/:f/:sf/:g/:sg/:s/:ss', (req, res) => {
    const O = req.params.o
    const So = req.params.so
    const F = req.params.f
    const Sf = req.params.sf
    const G = req.params.g
    const Sg = req.params.sg
    const S = req.params.s
    const Ss = req.params.ss
    return db.get_selectiont(O, So, F, Sf, G, Sg, S, Ss)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

app.put('/csvtosql', upload.single('file'), (req, res) => {
    return db.csvtosql(req.file.path)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

module.exports = app