import pandas as pd
import numpy as np
import math
import psycopg2


"""
boxexit is a function that will look if a box already exist in a database
it will add the box 0 if it not exist yet

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
:param admin: boolean value to authorize or not the overwrite

return noBox that not exist in the databse and a string of explanation
"""
def boxExist(olddf, dbName):


    conn = psycopg2.connect(
        host="db-entomoc",
        database="entomologie",
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

    zeroExist = """SELECT "id_box" FROM "Box" WHERE "id_box"=0 """
    cursor.execute(zeroExist)

    if cursor.fetchall()==[]:
        insertquery = """INSERT INTO "Box"
                            ("id_box", "location", "museum", "paratypes", "types")
                            VALUES
                            ((%s),(%s),(%s),(%s),(%s))"""
        datainsertquery = (0,None, None, None, None)
        cursor.execute(insertquery, datainsertquery)

    SelectAllBoxID = """SELECT "id_box" FROM "Box" """
    cursor.execute(SelectAllBoxID)
    AllBoxIDInter = cursor.fetchall()
    AllBoxID = [item[0] for item in AllBoxIDInter]

    for i, row in df.iterrows():
        if row.Num_ID not in AllBoxID:
            noBox.append(i+2)

    conn.commit()

    cursor.close()
    return noBox, "Some boxes has not been created yet"
