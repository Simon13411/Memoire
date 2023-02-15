const { Client } = require('pg');
const { search } = require('./app');
const { spawn } = require('child_process');
const client = new Client({
    user: 'postgres',
    host: 'postgresc',
    database: 'entomologie',
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
    var searchquery = 'SELECT * FROM "Box"'
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

function get_result(order, suborder, family, subfamily) {
    var searchquery = `SELECT * FROM "Box" 
                        WHERE`
    if (order !== 'NULL') {
        searchquery = searchquery.concat(" \"Order\"='", order, "' ", "AND")
    }
    if (suborder !== 'NULL') {
        searchquery = searchquery.concat(" \"subOrder\"='", suborder, "' ", "AND")

    }
    if (family !== 'NULL') {
        searchquery = searchquery.concat(" \"Family\"='", family, "' ", "AND")
    }
    if (subfamily !== 'NULL') {
        searchquery = searchquery.concat(" \"SubFamily\"='", subfamily, "' ", "AND")
    }
    searchquery = searchquery.substring(0,searchquery.length-4)
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

function get_selection() {
    var searchquery = `SELECT * FROM "Order"`
    
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

function csvtosql(filename) {
    console.log("Subprocess spawning")
    const script = spawn('python3', ['ExecuteFillDb.py', filename]);
    console.log("Subprocess spawned")
    console.log(filename)
    script.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    script.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    script.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

module.exports = {
    get_all,
    get_result,
    get_selection,
    csvtosql
}