const axios = require('axios')

const express = require('express')

const app = express.Router()

const IP = process.env.IP

//DBOps (port 4001)
app.get('/get_all', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_all`)
})

app.get('/get_result', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_result?offs=${req.query.offs}&o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectiono', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiono?so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectionso', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionso?o=${req.query.o}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectiong', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiong?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectionsg', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionsg?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectionf', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionf?o=${req.query.o}&so=${req.query.so}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selectionsf', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionsf?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_selections', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selections?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&ss=${req.query.ss}`)
})

app.get('/get_selectionss', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectionss?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}`)
})

app.get('/get_selectiont', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_selectiont?o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.put('/csvtosql', (req, res) => {
    res.redirect(307, `http://${IP}:4001/csvtosql`)
})


//FileDownloader (port 4002)
app.get('/boxestemplate', (req, res) => {
    res.redirect(307, `http://${IP}:4002/boxestemplate`)
})

app.get('/individualstemplate', (req, res) => {
    res.redirect(307, `http://${IP}:4002/individualstemplate`)
})

//LogIn and SignIn (port 4003)
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