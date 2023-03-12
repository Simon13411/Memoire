const CryptoJS = require('crypto-js');
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
      console.log('connected')
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
          return resolve(res)
        }
    })
  })
}

module.exports = {
    login
}