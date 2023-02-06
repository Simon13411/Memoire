const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgresc',
    database: 'test1',
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


function get_all() {
    var searchquery = 'SELECT * FROM "Woman"'
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
    get_all
}