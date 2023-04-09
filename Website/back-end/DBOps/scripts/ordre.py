import sqlite3
import pandas as pd
import numpy as np

def insertOrder(data, cursor, conn) :
    toinsert = data["Order"].values.tolist()
    duplicationquery =  """SELECT MAX("id_order")
                            FROM "Order" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        
        if isinstance(toinsert[i], str) : orderList  = toinsert[i].split("_")
        else : orderList = ["NULL"]
        
        for index in orderList:
            if index=="NULL": continue
            
            duplicationquery =  """SELECT *
                                FROM "Order" 
                                WHERE "name" = '{}' """.format(index) 
            cursor.execute(duplicationquery)
            if cursor.fetchall() == [] :
                insertquery = """INSERT INTO "Order"
                            ("id_order", "name") 
                            VALUES 
                            ({},'{}') """.format(Count, index)
                #print(insertquery)
                cursor.execute(insertquery)
                Count+=1
    conn.commit()
