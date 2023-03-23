const { Client } = require('pg');
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

function get_result(Offs, O, So, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT B."id_box", B."location", B."museum", B."paratypes", B."types", R."Order",
                        R."subOrder", R."Family", R."subFamily", R."Tribu", R."Genus", R."subGenus", R."Species", R."subSpecies", Col."name" as "Col"
                        FROM "Box" B, "CollectionBox" ColBox, "Collection" Col,
                        (SELECT P."box_id" as "bid", O."name" as "Order", So."name" as "subOrder", F."name" as "Family", Sf."name" as "subFamily", T."name" as "Tribu", G."name" as "Genus", Sg."name"as "subGenus", S."name" as "Species", Ss."name" as "subSpecies"
                            FROM "PopuBox" P, "Population" P2
                                LEFT OUTER JOIN "Order" O On P2."order_id"=O."id_order"
                                LEFT OUTER JOIN "subOrder" So ON P2."suborder_id"=So."id_suborder"
                                LEFT OUTER JOIN "Family" F ON P2."family_id"=F."id_family"
                                LEFT OUTER JOIN "subFamily" Sf ON P2."subFamily_id"=Sf."id_subfamily"
                                LEFT OUTER JOIN "Tribu" T ON P2."tribu_id"=T."id_tribu"
                                LEFT OUTER JOIN "Genus" G ON P2."genus_id"=G."id_genus"
                                LEFT OUTER JOIN "subGenus" Sg ON P2."subGenus_id"=Sg."id_subgenus"
                                LEFT OUTER JOIN "Species" S ON P2."species_id"=S."id_species"
                                LEFT OUTER JOIN "subSpecies" Ss ON P2."subSpecies_id"=Ss."id_subspecies"
                                WHERE P."population_id"=P2."id_population"
                                    AND (O."name"='${O}' OR '${O}'='NULL')
                                    AND (So."name"='${So}' OR '${So}'='NULL')
                                    AND (F."name"='${F}' OR '${F}'='NULL')
                                    AND (Sf."name"='${Sf}' OR '${Sf}'='NULL')
                                    AND (T."name"='${T}' OR '${T}'='NULL')
                                    AND (G."name"='${G}' OR '${G}'='NULL')
                                    AND (Sg."name"='${Sg}' OR '${Sg}'='NULL')
                                    AND (S."name"='${S}' OR '${S}'='NULL')
                                    AND (Ss."name"='${Ss}' OR '${Ss}'='NULL') 
                                LIMIT 10 OFFSET ${Offs}) AS R
                        WHERE B."id_box" = R."bid" 
                        AND ColBox."box_id"=B."id_box" 
                        AND ColBox."collection_id"=Col."id_collection"`

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

function get_selectiono(So, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT O."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
  
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

function get_selectionso(O, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT So."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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

function get_selectiong(O, So, F, Sf, T, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT G."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`

    
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

function get_selectionsg(O, So, F, Sf, T, G, S, Ss) {
    var searchquery = `SELECT DISTINCT Sg."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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

function get_selectionf(O, So, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT F."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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

function get_selectionsf(O, So, F, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT Sf."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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

function get_selections(O, So, F, Sf, T, G, Sg, Ss) {
    var searchquery = `SELECT DISTINCT S."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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

function get_selectionss(O, So, F, Sf, T, G, Sg, S) {
    var searchquery = `SELECT DISTINCT Ss."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (T."name" = '${T}' OR '${T}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')`
    
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

function get_selectiont(O, So, F, Sf, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT T."name" as "name"
                        FROM "Population" P
                        LEFT OUTER JOIN "Order" O On P."order_id"=O."id_order"
                        LEFT OUTER JOIN "subOrder" So ON P."suborder_id"=So."id_suborder"
                        LEFT OUTER JOIN "Family" f ON P."family_id"=F."id_family"
                        LEFT OUTER JOIN "subFamily" Sf ON P."subFamily_id"=Sf."id_subfamily"
                        LEFT OUTER JOIN "Tribu" T ON P."tribu_id"=T."id_tribu"
                        LEFT OUTER JOIN "Genus" G ON P."genus_id"=G."id_genus"
                        LEFT OUTER JOIN "subGenus" Sg ON P."subGenus_id"=Sg."id_subgenus"
                        LEFT OUTER JOIN "Species" S ON P."species_id"=S."id_species"
                        LEFT OUTER JOIN "subSpecies" Ss ON P."subSpecies_id"=Ss."id_subspecies"
                        WHERE (O."name" = '${O}' OR '${O}'='NULL')
                        AND (So."name" = '${So}' OR '${So}'='NULL')
                        AND (F."name" = '${F}' OR '${F}'='NULL')
                        AND (Sf."name" = '${Sf}' OR '${Sf}'='NULL')
                        AND (G."name" = '${G}' OR '${G}'='NULL')
                        AND (Sg."name" = '${Sg}' OR '${Sg}'='NULL')
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')`
    
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
    get_selectiono,
    get_selectionso,
    get_selectiong,
    get_selectionsg,
    get_selectionf,
    get_selectionsf,
    get_selections,
    get_selectionss,
    get_selectiont,
    csvtosql
}