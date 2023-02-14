const express = require('express')

const app = express.Router()
const db = require('./db_ops')

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


app.put('/get_query', (req, res) => {
    const cat = req.body.category
    return db.addcat(cat)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json()
    })
})

module.exports = app