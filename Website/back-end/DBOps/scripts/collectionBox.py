import sqlite3
import pandas as pd
import numpy as np
import math

def insertCollectionBox(data, cursor, conn) :
    toinsertID = data["Num_ID"].values.tolist()
    toinsertCollection = data["Collection_Name"].values.tolist()
    duplicationquery =  """SELECT MAX("id_species")
                            FROM "Species" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertID)):
        collname = toinsertCollection[i]
        #On suppose qu'il est obligé d'avoir un name pour la collection
        collectionName = """SELECT "id_collection"
                        FROM "Collection"
                        WHERE "name"='{}' """.format(toinsertCollection[i])
        cursor.execute(collectionName)
        collectionNameList = cursor.fetchall()
        if (len(collectionNameList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(collectionNameList)
        duplicationquery =  """SELECT "collection_id", "box_id"
                                FROM "CollectionBox" 
                                WHERE "collection_id" = {} and "box_id" = {} """.format(collectionNameList[0][0], toinsertID[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            
            
            insertquery = """INSERT INTO "CollectionBox"
                            ("collection_id", "box_id") 
                            VALUES 
                            ({},{}) """.format(collectionNameList[0][0], toinsertID[i])
            print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
