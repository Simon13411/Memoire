import pandas as pd
import numpy as np

def insertSubOrder(data, cursor, conn) :
    toinsert = data["Suborder"].values.tolist()
    duplicationquery =  """SELECT MAX(id_suborder)
                            FROM "subOrder" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        duplicationquery =  """SELECT *
                                FROM "subOrder" 
                                WHERE "name" = '{}' """.format(toinsert[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            insertquery = """INSERT INTO "subOrder"
                            (id_suborder, "name") 
                            VALUES 
                            ({},"{}")""".format(Count, toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
