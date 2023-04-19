const loginops = require('./login_ops')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    return loginops.login(username, password)
        .then(([token, role]) => {
            res.status(200).json({ success: true, token: token, role: role});
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});

app.post('/signup', (req, res) => {
    const { username, password, role, token } = req.body;

    return loginops.signup(username, password, role, token)
        .then((results) => {
            res.status(200).json( {success: true });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});

app.post('/adminright', (req, res) => {
    const { username } = req.body;

    return loginops.adminright(username)
        .then((results) => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});


app.post('/validate-token', (req, res) => {
    const { token } = req.body

    return loginops.verifytoken(token)
        .then((username) => {
            res.status(200).json({ success: true, username: username });
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});

app.get('/get-users', (req, res) => {
    return loginops.getusers()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});

app.post('/modifypw', (req, res) => {
    const { username, password, token } = req.body

    return loginops.modifypw(username, password, token)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});

app.post('/modifyright', (req, res) => {
    const { username, role, token } = req.body

    return loginops.modifyright(username, role, token)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            errorhandler(err, res)
        });
});


app.post('/verifyuserright', (req, res) => {
    const { token } = req.body
    return loginops.verifyuserrightrequest(token)
        .then((results) => {
            res.status(200).json({success: true});
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})

app.post('/verifyadminright', (req, res) => {
    const { token } = req.body
    return loginops.verifyadminrightrequest(token)
        .then((results) => {
            res.status(200).json({success: true});
        })
        .catch((err) => {
            errorhandler(err, res)
        });
})


//Helper for errors
function errorhandler(err, res) {
    console.log(err)
    if (err.message) {
        res.status(401).json( {error: err.message});
    }
    else {
        res.status(404).json( {error : "Erreur Back-end Login" } );
    }
}


module.exports = app