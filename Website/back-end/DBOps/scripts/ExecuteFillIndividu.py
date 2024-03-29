import name
import namescientist
import scientific
import population
import boxexist
import individu

import IndividuFilter as filtre

import pandas as pd
import psycopg2
import sys
import json

filename = sys.argv[1]
extracteddata = pd.read_excel(filename, engine="openpyxl")

admin = False
if (sys.argv[2] == "true") :
    admin = True
elif (sys.argv[2] == "false") :
    admin= False

print("[MY_APP_LOG] Begin Filtering")
a,b,data,d = filtre.filterIndividu(extracteddata)
print("[MY_APP_LOG] End Filtering")

#There is some error from the encoding
if b>0:
    if a == []:
        print("Wrong column's name")
    else:
        print(f'{{"type": "{b} line have wrong format", "lines":{a}, "errors": {json.dumps(d)}}}')
#there is no error so we check if a box exist
elif b==0:
    
    print("[MY_APP_LOG] Begin boxes verification")
    box, colOk = boxexist.boxExist(extracteddata, "entomologie")
    print("[MY_APP_LOG] End boxes verification")
    if(len(box)>0):
        #il y a des boites qui n'existe pas encore
        print(f'{{"type": "These lines have a wrong box", "lines":{box}}}')

    else:
        data = data.where(data.notnull(), None)
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
        

        name.insertName(data, cursor, conn,"Order",  "Order", "id_order")
        name.insertName(data, cursor, conn,"Suborder",  "subOrder", "id_suborder")
        name.insertName(data, cursor, conn,"Family",  "Family", "id_family")
        name.insertName(data, cursor, conn,"Subfamily",  "subFamily", "id_subfamily")
        name.insertName(data, cursor, conn,"Tribu",  "Tribu", "id_tribu")
        scientific.insertScientific(data, cursor, conn)
        namescientist.insertNameScientist(data, cursor, conn,"Genus", "Genus_Descriptor", "Genus_Date", "Genus", "id_genus")
        namescientist.insertNameScientist(data, cursor, conn,"Subgenus", "Subgenus_Descriptor", "Subgenus_Date", "subGenus", "id_subgenus")
        namescientist.insertNameScientist(data, cursor, conn,"species", "Species_Descriptor", "Species_Date", "Species", "id_species")
        namescientist.insertNameScientist(data, cursor, conn,"Subspecies", "Subspecies_descriptor", "Subspecies_Date", "subSpecies", "id_subspecies")
        
        population.insertPopulation(data, cursor, conn)

        individu.insertIndividu(data, cursor, conn, admin)
    
        cursor.close()
        