
import sqlite3
import pandas as pd
import numpy as np

def insertSubFamily(data, cursor, conn) :
    toinsert = data["Subfamily"].values.tolist()
    duplicationquery =  """SELECT MAX(id_subfamily)
                            FROM subFamily"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        duplicationquery =  """SELECT *
                                FROM subFamily 
                                WHERE name = "{}" """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO subFamily
                            (id_subfamily, name) 
                            VALUES 
                            ({},"{}")""".format(Count, toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
