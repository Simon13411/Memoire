const express = require('express');

const loginops = require('./login_ops')
const tokenops = require('./token_ops')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  return loginops.login(username, password)
  .then((token) => {
    // Set the token as a HttpOnly cookie
    res.status(200).json({ success: true, token: token});
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

  return tokenops.verifytoken(authToken)
  .then((token) => {
    // Set the token as a HttpOnly cookie
    res.cookie('auth_token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ success: true, username: token.username });
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json({ succes: false });
  });
});

module.exports = app