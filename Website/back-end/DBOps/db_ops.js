const { Client } = require('pg');
const { spawn } = require('child_process');
const client = new Client({
    user: 'postgres',
    host: 'db-entomo',
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
                        So."name" as "suborder", F."name" as "family", Sf."name" as "subfamily", T."name" as "tribu", G."name" as "genus", Sg."name" as "subgenus" , S."name" as "species", Ss."name" as "subspecies", Col."name" as "collection", Spec."range_begin" as "srangebegin", Spec."range_end" as "srangeend", Gen."range_begin" as "grangebegin", Gen."range_end" as "grangeend", loan."prenom" as "loaner"
                            FROM "Box" B
                            LEFT OUTER JOIN "CollectionBox" ColBox ON B."id_box"=ColBox."box_id"
                            LEFT OUTER JOIN "Collection" Col ON ColBox."collection_id"=Col."id_collection"
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
                            LEFT OUTER JOIN "SpeciesRange" Spec ON B."speciesrange_id"=Spec."id_speciesrange"
                            LEFT OUTER JOIN "GenusRange" Gen ON B."genusrange_id"=Gen."id_genusrange"
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
    var searchquery = `SELECT COUNT(*) OVER() AS total_rows, B."id_box", B."location", B."museum", B."paratypes", B."types", R."Order",
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
                        AND ColBox."box_id"=B."id_box" 
                        AND ColBox."collection_id"=Col."id_collection"
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
    var searchquery = `SELECT COUNT(*) OVER() AS total_rows, I."id_individu", I."box_id", I."continent", I."country", I."ecozone", O."name" as "Order",
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND O."name" IS NOT NULL`
  
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND So."name" IS NOT NULL`

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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND G."name" IS NOT NULL`

    
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND Sg."name" IS NOT NULL`
    
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND F."name" IS NOT NULL`
    
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND Sf."name" IS NOT NULL`
    
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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND S."name" IS NOT NULL`
    
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
                        AND (S."name" = '${S}' OR '${S}'='NULL')
                        AND Ss."name" IS NOT NULL`

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
                        AND (Ss."name" = '${Ss}' OR '${Ss}'='NULL')
                        AND T."name" IS NOT NULL`
    
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
    var searchquery = `SELECT "name" FROM "Loaner"`
                            
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

function get_collections() {
    var searchquery = `SELECT "name" FROM "Collection"`
                            
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

function addattribute(name, attribute) {

}

function deleteattribute(name, attribute) {
    
}

function addcollection(collection) {

}

function modifycollection(collection, newname) {
    
}

function addloaner(loaner) {

}

function modifyloaner(loaner, newname) {
    
}

function changeindivboxid(individ, newboxid) {
    var Queryverifnewboxid = `SELECT *
                            FROM "Box"
                            Where "id_box" = $1;`

    return new Promise(function (resolve, reject) {
        client.query(Queryverifnewboxid, [newboxid], (err, res) => {
            if (err) {
                console.error(err)
                console.log("Cas1")
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
    
}

function csvtosql(filename, type) {
    return new Promise(function(resolve, reject) {
      if (type === 'Box') {
        console.log("Subprocess spawning")
        const script = spawn('python3', ['ExecuteFillDb.py', filename]);
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
        const script = spawn('python3', ['ExecuteFillIndividu.py', filename]);
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

}

function indivSqlToCsv() {

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
    get_collections,
    addattribute,
    deleteattribute,
    addcollection,
    modifycollection,
    addloaner,
    modifyloaner,
    changeindivboxid,
    changeindivloaner,
    csvtosql,
    boxSqlToCsv,
    indivSqlToCsv
}