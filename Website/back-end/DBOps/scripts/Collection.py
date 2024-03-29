import sqlite3
import pandas as pd
import numpy as np

def insertCollection(data, cursor, conn) :
    toinsert = data["Collection_Name"].values.tolist()
    duplicationquery =  """SELECT MAX("id_collection")
                            FROM "Collection" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        duplicationquery =  """SELECT *
                                FROM "Collection" 
                                WHERE "name" = (%s)"""
        dataduplicationquery = (toinsert[i],) 
        cursor.execute(duplicationquery, dataduplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO "Collection"
                            ("id_collection", "name") 
                            VALUES 
                            ((%s), (%s)) """
            datainsertquery = (Count, toinsert[i],)
            ##print(insertquery)
            cursor.execute(insertquery, datainsertquery)
            Count+=1
    conn.commit()
