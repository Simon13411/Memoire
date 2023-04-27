import sqlite3
import pandas as pd
import numpy as np
import math


"""
insertScientific is a function that will insert in a database all the known scientist

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
"""
def insertScientific(data, cursor, conn) :
    toinsert = data["Genus_Descriptor"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsert += data["Subgenus_Descriptor"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsert += data["Species_Descriptor"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsert += data["subSpecies_Descriptor"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    duplicationquery =  """SELECT MAX("id_sc")
                            FROM "Scientific" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        if toinsert[i] == None: continue
        duplicationquery =  """SELECT *
                                FROM "Scientific" 
                                WHERE "name" = '{}' """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            #print("here")
            insertquery = """INSERT INTO "Scientific"
                            ("id_sc", "name") 
                            VALUES 
                            ((%s), (%s)) """
            datainsert = (Count, toinsert[i])
            cursor.execute(insertquery, datainsert)
            Count+=1
    conn.commit()
