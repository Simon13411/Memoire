const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const SHA256 = require('crypto-js/sha256');

const { Client } = require('pg');
const { resolve } = require('path');
const client = new Client({
    user: 'postgres',
    host: 'postgresc',
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

function login(username, pw) {
  
  hashedpw = SHA256(pw)
  hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex)

  const searchquery = `SELECT role FROM "Accounts" 
                        WHERE "username"='${username}' AND "password"='${hashedpw2}'`
  
  return new Promise(function (resolve, reject) {
    client.query(searchquery, (err, res) => {
        if (err) {
          console.error(err)
        }
        else {
          if (res.rowCount === 1) {
            // Generate a unique and random authentication token
            const role = res.rows[0].role
            const token = crypto.randomBytes(32).toString('hex');
            const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token is valid for 24 hours
            const insertQuery = `INSERT INTO "Tokens" VALUES ('${username}', '${token}', to_timestamp('${expirationTime.toISOString()}', 'YYYY-MM-DDTHH:MI:SS.MSZ'))`;

            client.query(insertQuery, (err, res) => {
              if (err) {
                return reject(err);
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
        
          const insertQuery = `INSERT INTO "Accounts" VALUES ('${username}', '${hashedpw2}', ${role})`
          
          return new Promise(function (resolve2, reject) {
            client.query(insertQuery, (err, res) => {
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

function adminright(username) {
  searchquery = `SELECT role FROM "Accounts" WHERE "username"=$1;`

  return new Promise((resolve, reject) => {
    client.query(searchquery, [username], (err, res) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      else {
        if (!res.rows) {
          return reject(new Error("Request Problem"));
        }
        if (!res.rows[0]) {
          return reject(new Error("User's does not exist"));
        }
        if (res.rows[0].role === 1) {
          return resolve(res);
        } else {
          return reject(new Error("User's not an admin"));
        }
      }
    })
  })
}

function verifytoken(token) {
  return new Promise((resolve, reject) => {
      const SelectQuery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;

      if (typeof token !== 'string' || token.trim().length === 0) {
        return reject(new Error('Invalid format token'));
      }

      client.query(SelectQuery, [token], (error, results) => {
          if (error) {
              return reject(error);
          } else {
              if (results.rows.length === 1) {
                  resolve(results.rows[0].username);
              } else {
                  const DeleteQuery = `DELETE FROM "Tokens" WHERE "expirationTime" < NOW()`;
                  client.query(DeleteQuery, (error, results) => {
                      if (error) {
                          return reject(error);
                      } else {
                          if (results.rows.length > 0) {
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

function getusers() {
  searchquery = `SELECT "username" FROM "Accounts"`

  return new Promise((resolve, reject) => {
    client.query(searchquery, (err, res) => {
      if (err) {
        return reject(err)
      }
      else {
        return resolve(res)
      }
    })
  })
}

function modifypw(username, password, token) {
  return new Promise(function (resolve, reject) {
    if (verifyadminright(token) === false){
      return reject(new Error("You're not an admin"))
    }

    hashedpw = SHA256(password)
    hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex)

    const Updatequery = `UPDATE "Accounts"
                        SET "password" = '${hashedpw2}'  
                        WHERE "username"='${username}'`
                        
    client.query(Updatequery, (err, res) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          else {
            return resolve(res)
          }
        })
  })
}

function modifyright(username, role, token) {
  return new Promise(function (resolve, reject) {
    if (verifyadminright(token) === false){
      return reject(new Error("You're not an admin"))
    }
    const Updatequery = `UPDATE "Accounts"
                        SET "role" = '${role}'  
                        WHERE "username"='${username}'`

    client.query(Updatequery, (err, res) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          else {
            return resolve(res)
          }
        })
  })
}

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
    getusers,
    modifypw,
    modifyright
}