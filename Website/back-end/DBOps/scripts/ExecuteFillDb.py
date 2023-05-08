import name
import namescientist
import scientific
import Collection
import population
import box

import BoxFilter as filtre

import pandas as pd
import psycopg2
import sys
import json

filename = sys.argv[1]
#filename = "GoodFormat.xlsx"
extracteddata = pd.read_excel(filename, engine="openpyxl")

a,b,data,d = filtre.filterExcel(extracteddata)

admin = False
if (sys.argv[2] == "true") :
    admin = True
elif (sys.argv[2] == "false") :
    admin= False
  
if (b>0):
    if a == []:
        print("Wrong column's name")
    else:
        print(f'{{"type": "{b} lines have wrong format", "lines":{a}, "errors": {json.dumps(d)}}}')

else:
    data = data.where(data.notnull(), None)
    conn = psycopg2.connect(
        host="db-entomoc",
        database="entomologie",
        user="postgres",
        password="password"
    )
    cursor = conn.cursor()
    cursor = conn.cursor()
    print("[MY_APP_LOG] Successfully connected to DB")

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
    Collection.insertCollection(data, cursor, conn)
    population.insertPopulation(data, cursor, conn)

    box.insertBox(data, cursor, conn, admin)



    cursor.close()
