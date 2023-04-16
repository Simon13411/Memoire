import pandas as pd
import numpy as np
import math
import psycopg2


def boxExist(olddf, dbName):
    
    
    conn = psycopg2.connect(
        host="db-entomoc",
        database=dbName,
        user="postgres",
        password="password"
    )
    cursor = conn.cursor()
    
    #check if the column of the template are good or not
    checkCol = ["SpecimenCode", "Continent", "Country", "Ecozone", "Order", "Suborder", "Tribu", "Family","Subfamily", "Genus", "Subgenus", 
       "species", "Subspecies", "Num_ID", "Genus_Descriptor", "Species_Descriptor", "Subgenus_Descriptor", 
       "Subspecies_descriptor", "Genus_Date","Subgenus_Date","Species_Date","Subspecies_Date","Latitude", "Longitude"]
        
    df = olddf[checkCol].copy()
    noBox = []

    zeroExist = """SELECT "id_box" FROM "Box" """
    cursor.execute(zeroExist)

    if cursor.fetchall()==[]:
        insertquery = """INSERT INTO "Box"
                            ("id_box", "location", "museum", "paratypes", "types") 
                            VALUES 
                            ({},'{}','{}',{},{})""".format(0,"", "", "NULL", "NULL")
        cursor.execute(insertquery)

    SelectAllBoxID = """SELECT "id_box" FROM "Box" """
    cursor.execute(SelectAllBoxID)
    AllBoxIDInter = cursor.fetchall()
    AllBoxID = [item[0] for item in AllBoxIDInter]
    
    for i, row in df.iterrows():
        if row.Num_ID not in AllBoxID:
            noBox.append(i+2)

    cursor.close()
    return noBox, "Certaines boites ne sont pas encore crée"
