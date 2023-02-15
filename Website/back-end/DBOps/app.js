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


app.get('/get_result/:order/:suborder/:family/:subfamily', (req, res) => {
    const order = req.params.order
    const suborder = req.params.suborder
    const family = req.params.family
    const subfamily = req.params.subfamily
    return db.get_result(order, suborder, family, subfamily)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

app.get('/get_selection', (req, res) => {
    return db.get_selection()
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