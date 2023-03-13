const axios = require('axios')

const express = require('express')

const app = express.Router()

const IP = process.env.IP

//DBOps (port 4001)
app.get('/get_all', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_all`)
})

app.get('/get_query/:order/:suborder/:family/:subfamily', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_result/${req.params.order}/${req.params.suborder}/${req.params.family}/${req.params.subfamily}`)
})

app.get('/get_selection', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selection`)
})

app.put('/csvtosql', (req, res) => {
    res.redirect(307, `http://${IP}:4001/csvtosql`)
})


//FileDownloader
app.get('/boxestemplate', (req, res) => {
    res.redirect(307, `http://${IP}:4002/boxestemplate`)
})

app.get('/individualstemplate', (req, res) => {
    res.redirect(307, `http://${IP}:4002/individualstemplate`)
})

//LogIn and SignIn
app.post('/login', (req, res) => {
    res.redirect(307, `http://${IP}:4003/login`)
})

app.post('/signin', (req, res) => {
    res.redirect(307, `http://${IP}:4003/signin`)
})

app.post(`/validate-token`, (req, res) => {
    res.redirect(307, `http://${IP}:4003/validate-token`)
})

module.exports = app