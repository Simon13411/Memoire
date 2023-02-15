import pandas as pd
import numpy as np

def insertOrder(data, cursor, conn) :
    toinsert = data["Order"].values.tolist()
    duplicationquery =  """SELECT MAX(id_order)
                            FROM "Order" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        duplicationquery =  """SELECT *
                                FROM "Order" 
                                WHERE "name" = '{}' """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO "Order"
                            (id_order, name) 
                            VALUES 
                            ({},'{}')""".format(Count, toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
