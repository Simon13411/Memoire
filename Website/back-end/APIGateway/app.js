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

app.get('/get_selectiono/:so/:f/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiono/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selectionso/:o/:f/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionso/${req.params.o}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selectiong/:o/:so/:f/:sf/:t/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiong/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selectionsg/:o/:so/:f/:sf/:t/:g/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionsg/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selectionf/:o/:so/:sf/:t/:g/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionf/${req.params.o}/${req.params.so}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selectionsf/:o/:so/:f/:t/:g/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionsf/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
})

app.get('/get_selections/:o/:so/:f/:sf/:t/:g/:sg/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selections/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.ss}`)
})

app.get('/get_selectionss/:o/:so/:f/:sf/:t/:g/:sg/:s', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionss/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.t}/${req.params.g}/${req.params.sg}/${req.params.s}`)
})

app.get('/get_selectiont/:o/:so/:f/:sf/:g/:sg/:s/:ss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiont/${req.params.o}/${req.params.so}/${req.params.f}/${req.params.sf}/${req.params.g}/${req.params.sg}/${req.params.s}/${req.params.ss}`)
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