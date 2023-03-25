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
  const { username, password, role, token } = req.body;

  return loginops.signup(username, password, role, token)
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
  const { token: authToken } = req.body;

  return loginops.verifytoken(authToken)
  .then((username) => {
    res.status(200).json({ success: true, username: username });
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json({ succes: false });
  });
});

app.get('/get-users', (req, res) => {
  return loginops.getusers()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json(err);
  });
});

app.post('/modifypw', (req, res) => {
  const { username, password, token } = req.body

  return loginops.modifypw(username, password, token)
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json(err);
  });
});

app.post('/modifyright', (req, res) => {
  const { username, role, token } = req.body

  return loginops.modifyright(username, role, token)
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log(err)
    res.status(401).json(err);
  });
});

module.exports = app