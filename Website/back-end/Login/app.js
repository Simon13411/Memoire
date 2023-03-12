const express = require('express');
const app = express();
const loginops = require('./login_ops')

app.get('/login/:username/:pw', (req, res) => {
  const un = req.params.username
  const pw = req.params.pw

  return loginops.login(un, pw)
  .then((result) => {
      res.status(200).json(result)
  })
  .catch((err) => {
      res.status(404).json()
  })
});

module.exports = app