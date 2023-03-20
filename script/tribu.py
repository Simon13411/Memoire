import sqlite3
import pandas as pd
import numpy as np
import math

def insertTribu(data, cursor, conn) :
    toinsert = data["Tribu"].values.tolist()
    duplicationquery =  """SELECT MAX(id_tribu)
                            FROM Tribu"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        

        if isinstance(toinsert[i], str) : tribuList  = toinsert[i].split("_")
        else : tribuList = [""]
        
        for index in tribuList:
            
        
            duplicationquery =  """SELECT *
                                FROM Tribu 
                                WHERE name = "{}" """.format(index) 
            cursor.execute(duplicationquery)
            if cursor.fetchall() == [] :
                insertquery = """INSERT INTO Tribu
                            (id_tribu, name) 
                            VALUES 
                            ({},"{}")""".format(Count, index)
                print(insertquery)
                cursor.execute(insertquery)
                Count+=1
    conn.commit()
