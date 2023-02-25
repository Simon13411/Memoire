import sqlite3
import pandas as pd
import numpy as np

def insertPopulation(data, cursor, conn) :
    toinsertOrder = data["Order"].values.tolist()
    toinsertSubOrder = data["SubOrder"].values.tolist()
    toinsertTribu = data["Tribu"].values.tolist()
    toinsertFamily = data["Family"].values.tolist()
    toinsertSubFamily = data["SubFamily"].values.tolist()
    toinsertGenus = data["Genus"].values.tolist()
    toinsertSubGenus = data["SubGenus"].values.tolist()
    toinsertSpecies = data["species"].values.tolist()
    toinsertSubSpecies = data[""].values.tolist()
    duplicationquery =  """SELECT MAX(id_order)
                            FROM Ordre"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        duplicationquery =  """SELECT *
                                FROM Ordre 
                                WHERE name = "{}" """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO Ordre
                            (id_order, name) 
                            VALUES 
                            ({},"{}")""".format(Count, toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
