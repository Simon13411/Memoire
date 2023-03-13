const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const SHA256 = require('crypto-js/sha256');

const { Client } = require('pg');
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

const client2 = new Client({
  user: 'postgres',
  host: 'postgresc',
  database: 'auth',
  password: 'password',
  port: 5432,
});

client2.connect((err) => {
  if (err) {
      console.error('connection error', err.stack)
  } else {
      console.log('loginops connected to auth')
  }
})

function login(username, pw) {
  
  hashedpw = SHA256(pw)
  hashedpw2 = hashedpw.toString(CryptoJS.enc.Hex)

  var searchquery = `SELECT COUNT(*) FROM "Accounts" 
                        WHERE `
  searchquery = searchquery.concat(" \"un\"='", username, "' ", "AND")
  searchquery = searchquery.concat(" \"pw\"='", hashedpw2, "'")

  console.log(searchquery)
  
  return new Promise(function (resolve, reject) {
    client.query(searchquery, (err, res) => {
        if (err) {
          console.error(err)
        }
        else {
          if (res.rows[0].count === '1') {
            // Generate a unique and random authentication token
            const token = crypto.randomBytes(32).toString('hex');
            const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token is valid for 24 hours
            const insertQuery = `INSERT INTO "Tokens" VALUES ('${username}', '${token}', to_timestamp('${expirationTime.toISOString()}', 'YYYY-MM-DDTHH:MI:SS.MSZ'))`;
            console.log(insertQuery)
            client2.query(insertQuery, (err, res) => {
              if (err) {
                return reject(err);
              }
              else {
                return resolve(token);
              }
            });
          } else {
            return reject(new Error("Incorrect username or password"));
          }
        }
    })
  })
}

module.exports = {
    login
}