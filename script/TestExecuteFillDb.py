import TestFiltering as filtre
import pandas as pd

import ordre
import family
import subfamily
import scientific
import Genus
import subgenus
import species
import Collection
import speciesrange
import genusrange
import tribu
import suborder
import subspecies
import population
import box
import collectionBox


import psycopg2
import sys
import sqlite3


file = pd.ExcelFile("GoodFormat.xlsx")


a,b,data,d = filtre.filterExcel(file)

#Faire un truc pour admin
#Verifier si boite existe sinon oups probleme
print(a,b,data,d)

if (b>0):
    print("There is some problem")
else:
    
    database = "NewTest.db"
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    print("Successfully Connected to the db")

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
    Collection.insertCollection(data, cursor, conn)
    speciesrange.insertOrder(data, cursor, conn)
    genusrange.insertOrder(data, cursor, conn)
    population.insertPopulation(data, cursor, conn)
    box.insertBox(data, cursor, conn)
    collectionBox.insertCollectionBox(data, cursor, conn)
        
        

    cursor.close()
    
#gooddf.to_excel("FiltreTestBis.xlsx",index=False)