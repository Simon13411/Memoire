import sqlite3
import pandas as pd
import numpy as np
import math

def insertScientific(data, cursor, conn) :
    toinsert = data["Genus_Descriptor"].values.tolist()
    toinsert += data["Subgenus_Descriptor"].values.tolist()
    toinsert += data["Species_Descriptor"].values.tolist()
    toinsert += data["Species_Descriptor"].values.tolist()
    duplicationquery =  """SELECT MAX("id_sc")
                            FROM "Scientific" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        if isinstance(toinsert[i], float): toinsert[i]="Unknown"
        duplicationquery =  """SELECT *
                                FROM "Scientific" 
                                WHERE "name" = '{}' """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO "Scientific"
                            ("id_sc", "name") 
                            VALUES 
                            ({},'{}') """.format(Count, toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
