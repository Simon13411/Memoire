import ordre
import family
import subfamily
import scientific
import Genus
import subgenus
import species
import Collection
import speciesrange
import tribu
import suborder


import pandas as pd
import psycopg2
import sys

#Connexion
conn = psycopg2.connect(
    host="postgresc",
    database="entomologie",
    user="postgres",
    password="password"
)
cursor = conn.cursor()
print("Successfully Connected to the db")

filename = sys.argv[1]
data = pd.read_excel(filename,  engine='openpyxl')


### Ici on  va inserer tout mais on pourrait en fonctio d'arguments lancer, ajouter seulement certain trucs ###
### On peut également mettre certain insert en commentaires pour ajouter que ceux désirés ###


ordre.insertOrder(data, cursor, conn)
family.insertFamily(data, cursor, conn)
subfamily.insertSubFamily(data, cursor, conn)
scientific.insertScientific(data, cursor, conn)
Genus.insertGenus(data, cursor, conn)
subgenus.insertSubGenus(data, cursor, conn)
species.insertSpecies(data, cursor, conn)
Collection.insertCollection(data, cursor, conn)
#speciesrange.insertOrder(data, cursor, conn)
#tribu.insertTribu(data, cursor, conn)
suborder.insertSubOrder(data, cursor, conn)



cursor.close()
conn.close()