import ordre
import family
import subfamily
import scientific
import Genus
import subgenus
import species
import Collection
import tribu
import suborder
import subspecies
import population
import box

import BoxFilter as filtre

import pandas as pd
import psycopg2
import sys

filename = sys.argv[1]
extracteddata = pd.read_excel(filename, engine="openpyxl")

a,b,data,d = filtre.filterExcel(extracteddata)

#On va regarder pour l'admin si les boites existent deja, si oui on les supprimes et elle seront remise après
#Verifier si boite existe sinon oups probleme
admin = sys.argv[2]
if (b>0):
    print("kk")

else:
    conn = psycopg2.connect(
        host="db-entomoc",
        database="entomologie",
        user="postgres",
        password="password"
    )
    cursor = conn.cursor()
    print("Successfully connected to DB")


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
    Collection.insertCollection(data, cursor, conn)
    population.insertPopulation(data, cursor, conn)
    box.insertBox(data, cursor, conn, admin)



    cursor.close()
