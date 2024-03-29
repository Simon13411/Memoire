const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const SHA256 = require('crypto-js/sha256');

//Postgres client
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'db-loginc',
    database: 'login',
    password: 'password',
    port: 5432,
});

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('loginops connected to login')
    }
})

/* Get All usernames */
function getusers() {
    searchquery = `SELECT "username" FROM "Accounts" ORDER BY "username" ASC`

    return new Promise((resolve, reject) => {
        client.query(searchquery, (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve(res)
            }
        })
    })
}

/*Login Function/ username=username; pw=password*/
function login(username, pw) {
    hashedpw = SHA256(pw)                           //Hashing Password
    hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex) //Get string value of hashed pw

    const searchquery = `SELECT role FROM "Accounts" 
                        WHERE "username"=$1 AND "password"=$2`
  
    return new Promise(function (resolve, reject) {
        client.query(searchquery, [username, hashedpw2], (err, res) => {
            if (err) {
                console.error(err)
            }
            else {
                if (res.rowCount === 1) {
                    // Generate a unique and random authentication token
                    const role = res.rows[0].role
                    const token = crypto.randomBytes(32).toString('hex');
                    const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token is valid for 24 hours
                    const insertQuery = `INSERT INTO "Tokens" VALUES ($1, $2, to_timestamp('${expirationTime.toISOString()}', 'YYYY-MM-DDTHH:MI:SS.MSZ'))`;

                    client.query(insertQuery, [username, token], (err, res) => {
                        if (err) {
                            console.error(err)
                            return reject(new Error("Erreur DB"));
                        }
                        else {
                            return resolve([token, role]);
                        }
                    });
                } else {
                    return reject(new Error("Incorrect username or password"));
                }
            }
        })
    })
}

/*Sign Up Function/ username=username; pw=password; role=1(Admin)||0(User)*/
function signup(username, pw, role, token) {
    const searchQuery = `SELECT "username" FROM "Accounts" WHERE "username"='${username}'`
    return new Promise(function (resolve, reject) {
        if (verifyadminright(token) === false){
            return reject(new Error("You're not an admin"))
        }
        client.query(searchQuery, (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"));
            }
            else {
                if (res.rowCount < 1) {
                    hashedpw = SHA256(pw)
                    hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex)
                
                    const insertQuery = `INSERT INTO "Accounts" VALUES ($1, $2, $3)`
                    
                    return new Promise(function (resolve2, reject2) {
                        client.query(insertQuery, [username, hashedpw2, role], (err, res) => {
                            if (err) {
                                return reject(new Error("Erreur DB"));
                            }
                            else {
                                return resolve(resolve2(res));
                            }
                        });
                    })
                }
                else {
                    return reject(new Error("Username not available"));
                }
            }
        });
    })
}

/*Is username admin ?/ username=user for who we verify admin right*/
function adminright(username) {
    searchquery = `SELECT role FROM "Accounts" WHERE "username"=$1;`

    return new Promise((resolve, reject) => {
        client.query(searchquery, [username], (err, res) => {
            if (err) {
                console.error(err)
                return reject(new Error("Erreur DB"))
            }
            else {
                if (!res.rows) {
                    return reject(new Error("Request Problem"));
                }
                else if (!res.rows[0]) {
                    return reject(new Error("User's does not exist"));
                }
                else if (res.rows[0].role === 1) {
                    return resolve(res);
                } 
                else {
                    return reject(new Error("User's not an admin"));
                }
            }
        })
    })
}

/* --------------------------------------------  ACCOUNT MODIFICATION --------------------------------------- */

/* Modify password (new password = password) for user username/ token should be an admin token or token of user who change his password */
function modifypw(username, password, token) {
    return new Promise(function (resolve, reject) {
        if (typeof token !== 'string' || token.trim().length === 0) {
            return reject("Wrong format token");
        }

        //Verif autorisation
        const Tokenquery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND username=$2 AND "expirationTime" > NOW()`;
        client.query(Tokenquery, [token, username], (error, results) => {
            if (error) {
                return reject("Erreur DB");
            } else {
                if (results.rows.length === 1) { //User want to change his own password ?
                    /* Case where process continue */
                }
                else if (verifyadminright(token) === false) { //Not his own password and is not an admin ?
                    return reject(new Error("You don't have the right to do that"))
                }
            }
        })

        //ModifyPW
        hashedpw = SHA256(password)
        hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex)

        const Updatequery = `UPDATE "Accounts"
                            SET "password" = $1 
                            WHERE "username"=$2`
                            
        client.query(Updatequery, [hashedpw2, username], (err, res) => {
            if (err) {
                console.error(err)
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve(res)
            }
        })
    })
}

/* Modify right of user username; role=1(Admin)||0(User); token should be an admin token */
function modifyright(username, role, token) {
    return new Promise(function (resolve, reject) {
        if (verifyadminright(token) === false){
            return reject(new Error("You're not an admin"))
        }
        const Updatequery = `UPDATE "Accounts"
                            SET "role" = $1  
                            WHERE "username"=$2`

        client.query(Updatequery, [role, username], (err, res) => {
            if (err) {
                console.error(err)
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve(res)
            }
        })
    })
}

/* --------------------------------------------  TOKEN  --------------------------------------- */

/*Is token valid? If Yes to who it belongs? / token= token to verify*/
function verifytoken(token) {
    return new Promise((resolve, reject) => {
        const SelectQuery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;

        if (typeof token !== 'string' || token.trim().length === 0) {
            return reject(new Error('Invalid format token'));
        }

        client.query(SelectQuery, [token], (error, results) => {
            if (error) {
                return reject(new Error("Erreur DB"));
            } else {
                const DeleteQuery = `DELETE FROM "Tokens" WHERE "expirationTime" < NOW()`;
                if (results.rows.length === 1) {
                    client.query(DeleteQuery, (error2, results2) => {
                        if (error2) {
                            return reject(new Error("Erreur DB"));
                        } else {
                            if (results2.rows.length > 0) {
                                return reject(new Error('Invalid token not in DB + expired tokens deleted'));
                            } else {
                                return resolve(results.rows[0].username);
                            }
                        }
                    })
                }
                else {
                    client.query(DeleteQuery, (error2, results2) => {
                        if (error2) {
                            return reject(new Error("Erreur DB"));
                        } else {
                            if (results2.rows.length > 0) {
                                return reject(new Error('Invalid token not in DB + expired tokens deleted'));
                            } else {
                                return reject(new Error('Invalid token not in DB'));
                            }
                        }
                    })
                }
            }
        });
    });
}

/* Verify user token for DBOps requests that need at least a user role */
function verifyuserrightrequest(token) {
    return new Promise (function (resolve, reject) {
        if (typeof token !== 'string' || token.trim().length === 0) {
            return reject(new Error("Wrong token format"));
        }
        const Tokenquery = `SELECT * FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;
        client.query(Tokenquery, [token], (error, results) => {
            if (error) {
                return reject(new Error("Error DB"));
            } else {
                if (results.rows.length === 1) {
                    return resolve(results)
                }
                else {
                    return reject(new Error("Token not in DB"))
                }
            }
        })
    })
}

/* Verify admin token for DBOps requests that need an admin role */
function verifyadminrightrequest(token) {
    return new Promise (function (resolve, reject) {
        if (typeof token !== 'string' || token.trim().length === 0) {
            return reject(new Error("Wrong token format"));
        }
        const Tokenquery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;
        client.query(Tokenquery, [token], (error, results) => {
            if (error) {
                return reject(new Error("Error DB"));
            } else {
                if (results.rows.length === 1) {
                    const Userquery = `SELECT * FROM "Accounts" WHERE "username"='${results.rows[0].username}' AND "role" = 1`
                    
                    client.query(Userquery, (error2, results2) => {
                        if (error2) {
                            return reject(new Error("Erreur DB"));
                        }
                        else if (results2.rowCount === 1) {
                            return resolve(results2)
                        } else {
                            return reject(new Error("Wrong admin token"));
                        }
                    })
                }
                else {
                    return reject(new Error("Token not in DB"))
                }
            }
        })
    })
}

/* Verify admin token for Login requests that need an admin role */
function verifyadminright(token) {
    if (typeof token !== 'string' || token.trim().length === 0) {
        return false;
    }
    const Tokenquery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;
    client.query(Tokenquery, [token], (error, results) => {
        if (error) {
            return false
        } else {
            if (results.rows.length === 1) {
                const Userquery = `SELECT role FROM "Accounts" WHERE "username"='${results.rows[0].username}'`

                client.query(Userquery, (error2, results2) => {
                    if (error2) {
                        return false
                    }
                    else if (results2.rows[0].role === 1) {
                        return true
                    } else {
                        return false
                    }
                })
            }
        }
    })
}

module.exports = {
    login,
    signup,
    adminright,
    verifytoken,
    verifyadminrightrequest,
    verifyuserrightrequest,
    getusers,
    modifypw,
    modifyright
}