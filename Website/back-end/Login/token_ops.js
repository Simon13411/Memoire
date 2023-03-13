const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'postgresc',
    database: 'auth',
    password: 'password',
    port: 5432,
  });

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('tokenops connected to auth')
    }
})

function verifytoken(token) {
    // Vérifie si le token est un string non vide
    if (typeof token !== 'string' || token.trim().length === 0) {
      return Promise.reject(new Error('Invalid format token'));
    }
  
    return new Promise((resolve, reject) => {
        const SelectQuery = `SELECT username FROM "Tokens" WHERE "token"=$1 AND "expirationTime" > NOW()`;
        console.log(SelectQuery)
        client.query(SelectQuery, [token], (error, results) => {
            if (error) {
            reject(error);
            } else {
            if (results.rows.length === 1) {
                resolve(results.rows[0].username);
            } else {
                reject(new Error('Invalid token not in DB'));
            }
            }
        });
        });
  }

module.exports = {
    verifytoken
}