import ordre
import family
import subfamily
import scientific
import Genus
import subgenus
import species
import tribu
import suborder
import subspecies
import population
import boxexist
import individu

import IndividuFilter as filtre

import pandas as pd
import psycopg2
import sys

filename = sys.argv[1]
extracteddata = pd.read_excel(filename, engine="openpyxl")

admin = sys.argv[2]
a,b,data,d = filtre.filterIndividu(extracteddata)

if b>0:
    #il y a des lignes qui ont des problemes
    print(f"{b} lignes problématiques: {a} -> {d}")

box, colOk = boxexist.boxExist(extracteddata, "entomologie")
if(len(box)>0):
    #il y a des boites qui n'existe pas encore
    print(f"{box}, {colOk}")

else:
    conn = psycopg2.connect(
        host="db-entomoc",
        database="entomologie",
        user="postgres",
        password="password"
    )
    cursor = conn.cursor()
    print("[MY_APP_LOG] Successfully connected to DB")


    ### Ici on  va inserer tout mais on pourrait en fonctio d'arguments lancer, ajouter seulement certain trucs ###
    ### On peut également mettre certain insert en commentaires pour ajouter que ceux désirés ###


    tribu.insertTribu(data, cursor, conn)
    ordre.insertOrder(data, cursor, conn)
    suborder.insertSubOrder(data, cursor, conn)
    family.insertFamily(data, cursor, conn)
    subfamily.insertSubFamily(data, cursor, conn) 
    scientific.insertScientific(data, cursor, conn)
    Genus.insertGenus(data, cursor, conn)
    subgenus.insertSubGenus(data, cursor, conn)
    species.insertSpecies(data, cursor, conn)
    subspecies.insertSubSpecies(data, cursor, conn)
    population.insertPopulation(data, cursor, conn)

    individu.insertIndividu(data, cursor, conn, admin)

    cursor.close()
