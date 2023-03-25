const express = require('express');

const loginops = require('./login_ops')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  return loginops.login(username, password)
  .then(([token, role]) => {
    res.status(200).json({ success: true, token: token, admin: role});
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json({ success: false });
  });
});

app.post('/signup', (req, res) => {
  const { username, password, role } = req.body;

  return loginops.signup(username, password, role)
  .then((results) => {
    res.status(200).json( {success: true });
  })
  .catch((err) => {
    res.status(401).json({ success: false, error: err.message });
  });
});

app.post('/adminright', (req, res) => {
  const { username } = req.body;

  return loginops.adminright(username)
  .then((results) => {
    res.status(200).json({ success: true });
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json({ success: false });
  });
});


app.post('/validate-token', (req, res) => {
  console.log(req.body)
  const { token: authToken } = req.body;
  console.log(authToken)

  return loginops.verifytoken(authToken)
  .then((username) => {
    res.status(200).json({ success: true, username: username });
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json({ succes: false });
  });
});

module.exports = app