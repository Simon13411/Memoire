import sqlite3
import pandas as pd
import numpy as np
import math

def insertOrder(data, cursor, conn) :
    toinsert = data["Genus_range"].values.tolist()
    duplicationquery =  """SELECT MAX("id_genusrange")
                            FROM "GenusRange" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsert)):
        if isinstance(toinsert[i], str):
            
            speciesrangeList = toinsert[i].split("_")
            start = speciesrangeList[0]
            if(len(speciesrangeList)==2):
               end = speciesrangeList[1]
            else:
               end = ""
            duplicationquery =  """SELECT *
                                    FROM "GenusRange" 
                                    WHERE "range_begin" = '{}' and "range_end"= '{}' """.format(start, end) 
            cursor.execute(duplicationquery)
            if cursor.fetchall() == [] :
                insertquery = """INSERT INTO "GenusRange"
                                ("id_genusrange", "range_begin", "range_end") 
                                VALUES 
                                ({},'{}', '{}')""".format(Count, start, end)
                                #print(insertquery)
                cursor.execute(insertquery)
                Count+=1
    conn.commit()
