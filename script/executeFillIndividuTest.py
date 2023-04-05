import IndividuFilteredTest as filtre
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
import boxexist
import collectionBox
import individu

import psycopg2
import sqlite3



file = pd.ExcelFile("templateIndividuBis.xlsx")
database  = "Gembloux5_4.db"

#On va regarder si les individus existe deja par rapport a l'admin


#On regarde si l'id de la boite existe sinon probleme
box, colOk = boxexist.boxExist(file, database)
if(len(box)>0):
    #il y a des boites qui n'existe pas encore
    print(box, colOk)
admin=True
a,b,data,d = filtre.filterIndividu(file)
print(a,b,data,d)

if b>0:
    #il y a des lignes qui ont des problemes
    print("there is some problem")
else:
    
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
    population.insertPopulation(data, cursor, conn)
    
    individu.insertIndividu(data, cursor, conn, admin)
    
    
    
    cursor.close()
    
#gooddf.to_excel("FiltreTestBis.xlsx",index=False)