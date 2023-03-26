const axios = require('axios')

const express = require('express')

const app = express.Router()

const IP = process.env.IP

//DBOps (port 4001)
app.get('/get_boxdetails', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_boxdetails?id=${req.query.id}`)
})

app.get('/get_indivdetails', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_indivdetails?id=${req.query.id}`)
})

app.get('/get_boxresult', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_boxresult?offs=${req.query.offs}&o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
})

app.get('/get_indivresult', (req, res) => {
    res.redirect(307, `http://${IP}:4001/get_indivresult?offs=${req.query.offs}&o=${req.query.o}&so=${req.query.so}&f=${req.query.f}&sf=${req.query.sf}&t=${req.query.t}&g=${req.query.g}&sg=${req.query.sg}&s=${req.query.s}&ss=${req.query.ss}`)
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

app.put('/csvtosql/:type', (req, res) => {
    res.redirect(307, `http://${IP}:4001/csvtosql/${req.params.type}`)
})

app.get(`/boxessqltocsv`, (req, res) => {
    res.redirect(307, `http://${IP}:4001/boxessqltocsv`)
})

app.get(`/individualssqltocsv`, (req, res) => {
    res.redirect(307, `http://${IP}:4001/individualssqltocsv`)
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

app.post('/signup', (req, res) => {
    res.redirect(307, `http://${IP}:4003/signup`)
})

app.post('/adminright', (req, res) => {
    res.redirect(307, `http://${IP}:4003/adminright`)
})

app.post(`/validate-token`, (req, res) => {
    res.redirect(307, `http://${IP}:4003/validate-token`)
})

app.get(`/get-users`, (req, res) => {
    res.redirect(307, `http://${IP}:4003/get-users`)
})

app.post(`/modifypw`, (req, res) => {
    res.redirect(307, `http://${IP}:4003/modifypw`)
})

app.post(`/modifyright`, (req, res) => {
    res.redirect(307, `http://${IP}:4003/modifyright`)
})

module.exports = app