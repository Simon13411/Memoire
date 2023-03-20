import sqlite3
import pandas as pd
import numpy as np

def insertFamily(data, cursor, conn) :
    toinsert = data["Family"].values.tolist()
    duplicationquery =  """SELECT MAX(id_family)
                            FROM Family"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        
        
        if isinstance(toinsert[i], str) : familyList  = toinsert[i].split("_")
        else : familyList = [""]
        
        for index in familyList:
            
            duplicationquery =  """SELECT *
                                FROM Family  
                                WHERE name = "{}" """.format(index) 
            cursor.execute(duplicationquery)
            if cursor.fetchall() == [] :
                insertquery = """INSERT INTO Family
                            (id_family, name) 
                            VALUES 
                            ({},"{}")""".format(Count, index)
                print(insertquery)
                cursor.execute(insertquery)
                Count+=1
    conn.commit()
