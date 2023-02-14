const axios = require('axios')

const express = require('express')

const app = express.Router()

const IP = process.env.IP

//DBOps (port 4001)
app.get('/get_all', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_all`)
})

app.get('/get_query', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_query`)
})

module.exports = app