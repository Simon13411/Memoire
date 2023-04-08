const fs = require('fs')
const path = require('path');

const { Client } = require('pg');
const { spawn } = require('child_process');
const client = new Client({
    user: 'postgres',
    host: 'db-entomoc',
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


function get_boxdetails(id) {
    var searchquery = `SELECT B."id_box", B."location", B."museum", B."paratypes", B."types", O."name" as "order",
                        So."name" as "suborder", F."name" as "family", Sf."name" as "subfamily", T."name" as "tribu", G."name" as "genus", Sg."name" as "subgenus" , S."name" as "species", Ss."name" as "subspecies", Col."name" as "collection", loan."prenom" as "loaner"
                            FROM "Box" B
                            LEFT OUTER JOIN "Collection" Col ON B."collection_id"=Col."id_collection"
                            LEFT OUTER JOIN "PopuBox" P ON B."id_box"=P."box_id"
                            LEFT OUTER JOIN "Population" P2 ON P."population_id"=P2."id_population"
                            LEFT OUTER JOIN "Order" O ON P2."order_id"=O."id_order"
                            LEFT OUTER JOIN "subOrder" So ON P2."suborder_id"=So."id_suborder"
                            LEFT OUTER JOIN "Family" F ON P2."family_id"=F."id_family"
                            LEFT OUTER JOIN "subFamily" Sf ON P2."subFamily_id"=Sf."id_subfamily"
                            LEFT OUTER JOIN "Tribu" T ON P2."tribu_id"=T."id_tribu"
                            LEFT OUTER JOIN "Genus" G ON P2."genus_id"=G."id_genus"
                            LEFT OUTER JOIN "subGenus" Sg ON P2."subGenus_id"=Sg."id_subgenus"
                            LEFT OUTER JOIN "Species" S ON P2."species_id"=S."id_species"
                            LEFT OUTER JOIN "subSpecies" Ss ON P2."subSpecies_id"=Ss."id_subspecies"
                            LEFT OUTER JOIN (SELECT L.name as "prenom", LB.box_id
                                            FROM "loanBox" LB, "Loaner" L
                                            WHERE LB.loaner_id=L.id_loaner) as loan ON B."id_box"=loan.box_id
                            WHERE (B."id_box"=$1)`
                            
    return new Promise(function (resolve, reject) {
        client.query(searchquery, [id], (err, res) => {
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

function get_boxresult(Offs, O, So, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT COUNT(*) OVER() AS total_rows, B."id_box", B."location", B."museum", B."paratypes", B."types", R."Order",
                        R."subOrder", R."Family", R."subFamily", R."Tribu", R."Genus", R."subGenus", R."Species", R."subSpecies", Col."name" as "Col"
                        FROM "Box" B, "Collection" Col,
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
                                    AND (O."name"=$1 OR $1='NULL')
                                    AND (So."name"=$2 OR $2='NULL')
                                    AND (F."name"=$3 OR $3='NULL')
                                    AND (Sf."name"=$4 OR $4='NULL')
                                    AND (T."name"=$5 OR $5='NULL')
                                    AND (G."name"=$6 OR $6='NULL')
                                    AND (Sg."name"=$7 OR $7='NULL')
                                    AND (S."name"=$8 OR $8='NULL')
                                    AND (Ss."name"=$9 OR $9='NULL') 
                                ) AS R
                        WHERE B."id_box" = R."bid" 
                            AND B."collection_id"=Col."id_collection" 
                        LIMIT 10 OFFSET $10`
                        
    return new Promise(function (resolve, reject) {
        client.query(searchquery, [O, So, F, Sf, T, G, Sg, S, Ss, Offs], (err, res) => {
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

function get_indivdetails(id) {
    var searchquery = `SELECT I."id_individu", I."box_id", I."continent", I."country", I."ecozone", O."name" as "order",
    So."name" as "suborder", F."name" as "family", Sf."name" as "subfamily", T."name" as "tribu", G."name" as "genus", Sg."name" as "subgenus" , S."name" as "species", Ss."name" as "subspecies", loan."prenom" as "loaner"
                        FROM "Individu" I
                            LEFT OUTER JOIN "Population" P2 ON I."population_id"=P2."id_population"
                            LEFT OUTER JOIN "PopuBox" P ON P."population_id"=P2."id_population"
                            LEFT OUTER JOIN "Order" O On P2."order_id"=O."id_order"
                            LEFT OUTER JOIN "subOrder" So ON P2."suborder_id"=So."id_suborder"
                            LEFT OUTER JOIN "Family" F ON P2."family_id"=F."id_family"
                            LEFT OUTER JOIN "subFamily" Sf ON P2."subFamily_id"=Sf."id_subfamily"
                            LEFT OUTER JOIN "Tribu" T ON P2."tribu_id"=T."id_tribu"
                            LEFT OUTER JOIN "Genus" G ON P2."genus_id"=G."id_genus"
                            LEFT OUTER JOIN "subGenus" Sg ON P2."subGenus_id"=Sg."id_subgenus"
                            LEFT OUTER JOIN "Species" S ON P2."species_id"=S."id_species"
                            LEFT OUTER JOIN "subSpecies" Ss ON P2."subSpecies_id"=Ss."id_subspecies"
                            LEFT OUTER JOIN (SELECT L."name" as "prenom", LI."individu_id"
                            FROM "loanIndividu" LI, "Loaner" L
                            WHERE LI."loaner_id"=L."id_loaner") as loan on I."id_individu"=loan."individu_id"
                        
                        WHERE I."id_individu"=$1`
                            
    return new Promise(function (resolve, reject) {
        client.query(searchquery, [id], (err, res) => {
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

function get_indivresult(Offs, O, So, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = `SELECT DISTINCT COUNT(*) OVER() AS total_rows, I."id_individu", I."box_id", I."continent", I."country", I."ecozone", O."name" as "Order",
    So."name" as "subOrder", F."name" as "Family", Sf."name" as "subFamily", T."name" as "Tribu", G."name" as "Genus", Sg."name" as "subGenus" , S."name" as "Species", Ss."name" as "subSpecies"
                        FROM "Individu" I
                            LEFT OUTER JOIN "Population" P2 ON I."population_id"=P2."id_population"
                            LEFT OUTER JOIN "PopuBox" P ON P."population_id"=P2."id_population"
                            LEFT OUTER JOIN "Order" O On P2."order_id"=O."id_order"
                            LEFT OUTER JOIN "subOrder" So ON P2."suborder_id"=So."id_suborder"
                            LEFT OUTER JOIN "Family" F ON P2."family_id"=F."id_family"
                            LEFT OUTER JOIN "subFamily" Sf ON P2."subFamily_id"=Sf."id_subfamily"
                            LEFT OUTER JOIN "Tribu" T ON P2."tribu_id"=T."id_tribu"
                            LEFT OUTER JOIN "Genus" G ON P2."genus_id"=G."id_genus"
                            LEFT OUTER JOIN "subGenus" Sg ON P2."subGenus_id"=Sg."id_subgenus"
                            LEFT OUTER JOIN "Species" S ON P2."species_id"=S."id_species"
                            LEFT OUTER JOIN "subSpecies" Ss ON P2."subSpecies_id"=Ss."id_subspecies"
                                WHERE (O."name"=$1 OR $1='NULL')
                                AND (So."name"=$2 OR $2='NULL')
                                AND (F."name"=$3 OR $3='NULL')
                                AND (Sf."name"=$4 OR $4='NULL')
                                AND (T."name"=$5 OR $5='NULL')
                                AND (G."name"=$6 OR $6='NULL')
                                AND (Sg."name"=$7 OR $7='NULL')
                                AND (S."name"=$8 OR $8='NULL')
                                AND (Ss."name"=$9 OR $9='NULL') 
                                    LIMIT 10 OFFSET $10`


    return new Promise(function (resolve, reject) {
        client.query(searchquery, [O, So, F, Sf, T, G, Sg, S, Ss, Offs], (err, res) => {
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

function get_selectiono(So, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = "";

    if (So === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "Order" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT O."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND O."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
  console
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectionso(O, F, Sf, T, G, Sg, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "subOrder" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT So."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND So."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }

    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectiong(O, So, F, Sf, T, Sg, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "Genus" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT G."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND G."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }

    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectionsg(O, So, F, Sf, T, G, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "subGenus" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT Sg."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND Sg."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectionf(O, So, Sf, T, G, Sg, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "Family" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT F."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND F."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectionsf(O, So, F, T, G, Sg, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "subFamily" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT Sf."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND Sf."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selections(O, So, F, Sf, T, G, Sg, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "Species" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT S."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND S."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectionss(O, So, F, Sf, T, G, Sg, S) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && Sf === "NULL" && T === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL") {
        searchquery = `SELECT "name" FROM "subSpecies" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT Ss."name" as "name"
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
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND Ss."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }

    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_selectiont(O, So, F, Sf, G, Sg, S, Ss) {
    var searchquery = "";

    if (O === "NULL" && So === "NULL" && F === "NULL" && Sf === "NULL" && G === "NULL" && Sg === "NULL" && S === "NULL" && Ss === "NULL") {
        searchquery = `SELECT "name" FROM "Tribu" ORDER BY "name" ASC`
    }
    else {
        searchquery = `SELECT DISTINCT T."name" as "name"
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND T."name" IS NOT NULL
                        ORDER BY "name" ASC`
    }
    
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function get_loaners(){
    var searchquery = `SELECT "name" FROM "Loaner" ORDER BY "name" ASC`
                            
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function getloanerinfo(name){
    var searchquery = `SELECT "name", "phone", "mail" FROM "Loaner" WHERE "name"=$1`
                            
    return new Promise(function (resolve, reject) {
        client.query(searchquery, [name], (err, res) => {
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

function get_collections() {
    var searchquery = `SELECT "name" FROM "Collection" ORDER BY "name" ASC`
                            
    return new Promise(function (resolve, reject) {
        client.query(searchquery, (err, res) => {
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

function addattribute(table, attribute) {
    var query = '';
    console.log("Here3")
    return new Promise(function (resolve, reject) {
        if (table === "order") {
            query = `INSERT INTO "Order"
                    ("id_order", "name")
                    VALUES
                    ((SELECT COALESCE(MAX("id_order"),0)+1 FROM "Order"), $1);`
        }
        else if (table === "subOrder") {
            query = `INSERT INTO "subOrder"
                    ("id_suborder", "name")
                    VALUES
                    ((SELECT COALESCE(MAX("id_order"),0)+1 FROM "subOrder"), $1);`
        }
        else if (table === "family") {
            query = `INSERT INTO "Family"
                    ("id_family", "name")
                    VALUES
                    ((SELECT COALESCE(MAX("id_family"),0)+1 FROM "Family"), $1);`
        }
        else if (table === "subFamily") {
            query = `INSERT INTO "subFamily"
                    ("id_subfamily", "name")
                    VALUES
                    ((SELECT COALESCE(MAX("id_subfamily"),0)+1 FROM "subFamily"), $1);`
        }
        else if (table === "tribu") {
            query = `INSERT INTO "Tribu"
                    ("id_tribu", "name")
                    VALUES
                    ((SELECT COALESCE(MAX("id_tribu"),0)+1 FROM "Tribu"), $1)`
        }
        else if (table === "genus") {
            query = `INSERT INTO "Genus"
                    ("id_genus", "name", id_sc,date )
                    VALUES
                    ((SELECT COALESCE(MAX("id_genus"),0)+1 FROM "Genus"), $1, (SELECT "id_sc"FROM "Scientific" WHERE "name"='Unknown'), NULL)`
        }
        else if (table === "subGenus") {
            query = `INSERT INTO "subGenus"
                    ("id_subgenus", "name", id_sc,date )
                    VALUES
                    ((SELECT COALESCE(MAX("id_subgenus"),0)+1 FROM "subGenus"), $1, (SELECT "id_sc"FROM "Scientific" WHERE "name"='Unknown'), NULL)`
        }
        else if (table === "species") {
            query = `INSERT INTO "Species"
                    ("id_species", "name", id_sc,date )
                    VALUES
                    ((SELECT COALESCE(MAX("id_species"),0)+1 FROM "Species"), $1, (SELECT "id_sc"FROM "Scientific" WHERE "name"='Unknown'), NULL)`
        }
        else if (table === "subSpecies") {
            query = `INSERT INTO "subSpecies"
                    ("id_subspecies", "name", id_sc,date )
                    VALUES
                    ((SELECT COALESCE(MAX("id_subspecies"),0)+1 FROM "subSpecies"), $1, (SELECT "id_sc"FROM "Scientific" WHERE "name"='Unknown'), NULL);`
        }
        else {
            console.error("Invalid table")
            return reject(new Error("Invalid table"))
        }
        console.log("Here4")
        client.query(query, [attribute], (err, res) => {
            if (err) {
                console.error(err)
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve({success : true})
            }
        })
    })
}

function deleteattribute(table, attribute) {

    var verifquery = "";
    var deletequery= "";
    var tablename = "";

    return new Promise(function (resolve, reject) {
        if (table === "order2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "order_id"=(SELECT "id_order" FROM "Order" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "Order" 
                            WHERE "name" = $1;`
            
            tablename = "Order"
        }
        else if (table === "suborder2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "suborder_id"=(SELECT "id_suborder" FROM "subOrder" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "subOrder" 
                            WHERE "name" = $1;`

            tablename = "subOrder"
        }
        else if (table === "family2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "family_id"=(SELECT "id_family" FROM "Family" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "Family" 
                            WHERE "name" = $1;`

            tablename = "Family"
        }
        else if (table === "subfamily2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "subfamily_id"=(SELECT "id_subfamily" FROM "subFamily" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "subFamily" 
                            WHERE "name" = $1;`

            tablename = "subFamily"
        }
        else if (table === "tribu2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "tribu_id"=(SELECT "id_tribu" FROM "Tribu" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "Tribu" 
                            WHERE "name" = $1;`

            tablename = "Tribu"
        }
        else if (table === "genus2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "genus_id"=(SELECT "id_genus" FROM "Genus" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "Genus" 
                            WHERE "name" = $1;`

            tablename = "Genus"
        }
        else if (table === "subgenus2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "subgenus_id"=(SELECT "id_subgenus" FROM "subGenus" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "subGenus" 
                            WHERE "name" = $1;`

            tablename = "subGenus"
        }
        else if (table === "species2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "species_id"=(SELECT "id_species" FROM "Species" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "Species" 
                            WHERE "name" = $1;`

            tablename = "Species"
        }
        else if (table === "subspecies2") {
            verifquery = `SELECT * FROM "Population"
                            WHERE "species_id"=(SELECT "id_species" FROM "Species" WHERE "name"=$1);`

            deletequery = `DELETE 
                            FROM "subSpecies" 
                            WHERE "name" = $1;`

            tablename = "subSpecies"
        }
        else {
            console.error("Invalid attribute name")
            return reject(new Error("Invalid attribute name"))
        }

        client.query(verifquery, [attribute], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount === 0) {
                    client.query(deletequery, [attribute], (err2, res2) => {
                        if (err) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            return resolve(res2)
                        }
                    })
                }
                else {
                    return reject(new Error(`${tablename} ${attribute} is in use and can't be deleted`))
                }
            }
        })
    })
}

function addcollection(collection) {
    query = `INSERT INTO "Collection"
            ("id_collection", "name")
            VALUES
            ((SELECT COALESCE(MAX("id_collection"),0)+1 FROM "Collection"), $1)`

    return new Promise(function (resolve, reject) {
        client.query(query, [collection], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve({success: true})
            }
        })
    })
}

function modifycollection(collection, newname) {
    verifquery = `SELECT *
                FROM "Collection"
                WHERE "name"=$1;`

    updatequery =`UPDATE "Collection"
                    Set "name" = $1
                    WHERE "name"=$2;`

    return new Promise(function (resolve, reject) {
        client.query(verifquery, [collection], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount !== 0) {
                    client.query(updatequery, [newname, collection], (err2, res2) => {
                        if (err) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            return resolve(res2)
                        }
                    })
                }
                else {
                    return reject(new Error(`${collection} is not in use`))
                }
            }
        })
    })
}

function addloaner(name, mail, phone) {
    query = `INSERT INTO "Loaner"
    ("id_loaner", "name", "mail","phone")
    VALUES
    ((SELECT COALESCE(MAX("id_loaner"),0)+1 FROM "Loaner"), $1, $2, $3)`

    return new Promise(function (resolve, reject) {
        client.query(query, [name, mail, phone], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                return resolve({success: true})
            }
        })
    })
}

function modifyloaner(loaner, name, mail, phone) {
    verifquery = `SELECT *
                FROM "Loaner"
                WHERE "name"=$1;`

    updatequery = `UPDATE "Loaner"
                    Set "name" = $1,"mail"=$2, "phone"=$3
                    WHERE "name"=$4;`

    return new Promise(function (resolve, reject) {
        client.query(verifquery, [loaner], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount !== 0) {
                    client.query(updatequery, [name, mail, phone, loaner], (err2, res2) => {
                        if (err) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            return resolve(res2)
                        }
                    })
                }
                else {
                    return reject(new Error(`${loaner} is not in use`))
                }
            }
        })
    })
}

function changeindivboxid(individ, newboxid) {
    var Queryverifnewboxid = `SELECT *
                            FROM "Box"
                            Where "id_box" = $1;`

    return new Promise(function (resolve, reject) {
        client.query(Queryverifnewboxid, [newboxid], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount > 0) {
                    var UpdateQuery = `Update "Individu" 
                                        set "box_id" = $1 
                                        where "id_individu"=$2;`
                    client.query(UpdateQuery, [newboxid, individ], (err2, res2) => {
                        if (err) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            return resolve(res2)
                        }
                    })
                }
                else {
                    return reject(new Error(`BoxID ${newboxid} doesn't exist`))
                }
            }
        })
    })
}

function changeindivloaner(individ, newloaner) {
    verifquery = `SELECT *
                    FROM "Loaner"
                    Where "name"=$1;`

    deletequery = `DELETE FROM "loanIndividu" WHERE "individu_id"=$1;`
    insertquery = `INSERT INTO "loanIndividu"
                    ("loaner_id", "individu_id")
                    VALUES
                    ((SELECT "id_loaner"
                    FROM "Loaner"
                    WHERE "name"=$1), $2);`

    return new Promise(function (resolve, reject) {
        if (newloaner === null) {
            client.query(deletequery, [individ], (err, res) => {
                if (err) {
                    console.error(err)
                    return reject(new Error("Erreur DB"))
                }
                else {
                    return resolve(res)
                }
            })
        }
        client.query(verifquery, [newloaner], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount !== 0) {
                    client.query(deletequery, [individ], (err2, res2) => {
                        if (err) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            client.query(insertquery, [newloaner, individ], (err3, res3) => {
                                if (err3) {
                                    console.error(err3)
                                    return reject(new Error("Erreur DB"))
                                }
                                else {
                                    return resolve(res3)
                                }
                            })
                        }
                    })
                }
                else {
                    return reject(new Error(`${newloaner} is not in use`))
                }
            }
        })
    })
}

function changeboxcollection(boxid, collection) {
    verifquery = `SELECT *
                    FROM "Collection"
                    Where "name"=$1;`

    updatequery = `UPDATE "Box"
                    SET  "collection_id" = (SELECT "id_collection" FROM "Collection" WHERE "name"=$1)
                    WHERE "id_box" = $2`

    return new Promise(function (resolve, reject) {
        client.query(verifquery, [collection], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount !== 0) {
                    client.query(updatequery, [collection, boxid], (err2, res2) => {
                        if (err2) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            return resolve(res2)
                        }
                    })
                }
                else {
                    return reject(new Error(`${loaner} is not in use`))
                }
            }
        })
    })
}

function changeboxloaner(boxid, newloaner) {
    verifquery = `SELECT *
                    FROM "Loaner"
                    Where "name"=$1;`

    deletequery = `DELETE FROM "loanBox" WHERE "box_id"=$1;`
    insertquery = `INSERT INTO "loanBox"
                    ("loaner_id", "box_id")
                    VALUES
                    ((SELECT "id_loaner"
                    FROM "Loaner"
                    WHERE "name"=$1),$2);`

    return new Promise(function (resolve, reject) {
        if (newloaner === null) {
            client.query(deletequery, [boxid], (err, res) => {
                if (err) {
                    console.error(err)
                    return reject(new Error("Erreur DB"))
                }
                else {
                    return resolve(res)
                }
            })
        }
        client.query(verifquery, [newloaner], (err, res) => {
            if (err) {
                return reject(new Error("Erreur DB"))
            }
            else {
                if (res.rowCount !== 0) {
                    client.query(deletequery, [parseInt(boxid)], (err2, res2) => {
                        if (err2) {
                            console.error(err2)
                            return reject(new Error("Erreur DB"))
                        }
                        else {
                            client.query(insertquery, [newloaner, parseInt(boxid)], (err3, res3) => {
                                if (err3) {
                                    console.error(err3)
                                    return reject(new Error("Erreur DB"))
                                }
                                else {
                                    return resolve(res3)
                                }
                            })
                        }
                    })
                }
                else {
                    return reject(new Error(`${newloaner} is not in use`))
                }
            }
        })
    })
}

function csvtosql(filename, type) {
    return new Promise(function(resolve, reject) {
      if (type === 'Box') {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['ExecuteFillDb.py', filename, false]);
        console.log("Subprocess spawned")
        console.log(filename)

        script.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`)
          });
  
        script.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          return reject(new Error("Error during script run"));
        });
  
        script.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code === 1 || code === '1') {
            return reject(new Error("Error during script run"));
          }
          return resolve("Success");
        });
      } else if (type === 'Individual') {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['ExecuteFillIndividu.py', filename, false]);
        console.log("Subprocess spawned")
        console.log(filename)

        script.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`)
          });
  
        script.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          return reject(new Error("Error during script run"));
        });
  
        script.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code === 1 || code === '1'){
            return reject(new Error("Error during script run"));
          }
          else {
            return resolve("Success");
            }
        });
      }
    });
  }

  function csvtosqladmin(filename, type) {
    return new Promise(function(resolve, reject) {
      if (type === 'Box') {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['ExecuteFillDb.py', filename, true]);
        console.log("Subprocess spawned")
        console.log(filename)

        script.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`)
          });
  
        script.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          return reject(new Error("Error during script run"));
        });
  
        script.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code === 1 || code === '1') {
            return reject(new Error("Error during script run"));
          }
          return resolve("Success");
        });
      } else if (type === 'Individual') {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['ExecuteFillIndividu.py', filename, true]);
        console.log("Subprocess spawned")
        console.log(filename)

        script.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`)
          });
  
        script.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          return reject(new Error("Error during script run"));
        });
  
        script.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (code === 1 || code === '1'){
            return reject(new Error("Error during script run"));
          }
          else {
            return resolve("Success");
            }
        });
      }
    });
  }

function boxSqlToCsv(){
    return new Promise(function(resolve, reject) {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['SQLToCsvBox.py']);
        console.log("Subprocess spawned")

        fileDataString = '';

        script.stdout.on('data', (data) => {
            try {
                fileDataString += data.toString();
            }
            catch (err) {
                console.log(err)
                return reject(new Error("Error during script run"));
            }
        });


        script.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        return reject(new Error("Error during script run"));
        });

        script.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 1 || code === '1') {
            return reject(new Error("Error during script run"));
        }
        const fileData = JSON.parse(fileDataString.toString());
        const filename = fileData.filename;
        const contentBase64 = fileData.content;
        const content = Buffer.from(contentBase64, 'base64');

        const filePath = path.join(__dirname, 'FilesToReturn', filename);

        fs.writeFile(filePath, content, (err) => {
            if (err){
                console.log(err)
                return reject(new Error("Erreur lors de l'écriture du fichier"));
            }
            console.log(`${filename} has been saved.`);
            return resolve("Success");
        });
        });
    });
}

function indivSqlToCsv() {
    return new Promise(function(resolve, reject) {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['SQLToCsvIndividu.py']);
        console.log("Subprocess spawned")

        fileDataString = '';

        script.stdout.on('data', (data) => {
            try {
                fileDataString += data.toString();
            }
            catch (err) {
                console.log(err)
                return reject(new Error("Error during script run"));
            }
        });


        script.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        return reject(new Error("Error during script run"));
        });

        script.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 1 || code === '1') {
            return reject(new Error("Error during script run"));
        }
        const fileData = JSON.parse(fileDataString.toString());
        const filename = fileData.filename;
        const contentBase64 = fileData.content;
        const content = Buffer.from(contentBase64, 'base64');

        const filePath = path.join(__dirname, 'FilesToReturn', filename);

        fs.writeFile(filePath, content, (err) => {
            if (err){
                console.log(err)
                return reject(new Error("Erreur lors de l'écriture du fichier"));
            }
            console.log(`${filename} has been saved.`);
            return resolve("Success");
        });
        });
    });
}

module.exports = {
    get_boxdetails,
    get_boxresult,
    get_indivdetails,
    get_indivresult,
    get_selectiono,
    get_selectionso,
    get_selectiong,
    get_selectionsg,
    get_selectionf,
    get_selectionsf,
    get_selections,
    get_selectionss,
    get_selectiont,
    get_loaners,
    getloanerinfo,
    get_collections,
    addattribute,
    deleteattribute,
    addcollection,
    modifycollection,
    addloaner,
    modifyloaner,
    changeindivboxid,
    changeindivloaner,
    changeboxloaner,
    changeboxcollection,
    csvtosql,
    csvtosqladmin,
    boxSqlToCsv,
    indivSqlToCsv
}