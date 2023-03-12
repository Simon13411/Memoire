const express = require('express');

const loginops = require('./login_ops')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  return loginops.login(username, password)
  .then((result) => {
      res.status(200).json(result)
  })
  .catch((err) => {
      res.status(404).json()
  })
});

module.exports = app