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
            console.log(insertQuery)
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

function adminright(username) {
  searchquery = `SELECT role FROM "Accounts" WHERE "username"='${username}'`

  return new Promise((resolve, reject) => {
    client.query(searchquery, (err, res) => {
      if (err) {
        console.error(err)
      }
      else {
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
  // Vérifie si le token est un string non vide
  if (typeof token !== 'string' || token.trim().length === 0) {
    return Promise.reject(new Error('Invalid format token'));
  }

  return new Promise((resolve, reject) => {
      const SelectQuery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;

      client.query(SelectQuery, [token], (error, results) => {
          if (error) {
              reject(error);res.rows[0].role
          } else {
              if (results.rows.length === 1) {
                  resolve(results.rows[0].username);
              } else {
                  const DeleteQuery = `DELETE FROM "Tokens" WHERE "expirationTime" < NOW()`;
                  client.query(DeleteQuery, (error, results) => {
                      if (error) {
                          reject(error);
                      } else {
                          if (results.rows.length > 0) {
                              reject(new Error('Invalid token not in DB + expired tokens deleted'));
                          } else {
                              reject(new Error('Invalid token not in DB'));
                          }
                      }
                  })
              }
          }
      });
  });
}

module.exports = {
    login,
    adminright,
    verifytoken
}