import sqlite3
import pandas as pd
import numpy as np
import math

def insertSubSpecies(data, cursor, conn) :
    toinsertName = data["Subspecies"].values.tolist()
    toinsertDate = data["Subspecies_Date"].fillna("NULL").values.tolist()
    toinsertSc = data["Subspecies_descriptor"].values.tolist()
    duplicationquery =  """SELECT MAX("id_subspecies")
                            FROM "subSpecies" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(f"[MY_APP_LOG] {result}")
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertName)):
        
        
        if isinstance(toinsertName[i], str) : subspeciesList  = toinsertName[i].split("_")
        else : subspeciesList = ["NULL"]
        
        for index in subspeciesList:
            if index=="NULL": continue
            if isinstance(toinsertSc[i], float): toinsertSc[i]="Unknown"
            
        
            duplicationquery =  """SELECT *
                                FROM "subSpecies" 
                                WHERE "name" = '{}' """.format(index) 
            cursor.execute(duplicationquery)
            if cursor.fetchall() == [] :
            #S il y a un genus descriptor, on va recupere l'id du sc
                id_sc_query = """SELECT "id_sc"
                        FROM "Scientific"
                        WHERE "name"='{}' """.format(toinsertSc[i])
                cursor.execute(id_sc_query)
                id_sc_list = cursor.fetchall()
                if (len(id_sc_list)>1): #juste check mais normalement devrait pas aller la
                    print("[MY_APP_LOG] Pas normal")
                    print(f"[MY_APP_LOG] {id_sc_list}")
                dateNull = "NULL"
                """if not math.isnan(toinsertDate[i]):
                    insertquery = \"""INSERT INTO "subSpecies"
                                ("id_subspecies", "name", "id_sc", "date") 
                                VALUES 
                                ({},'{}',{},'{}') \""".format(Count, index, id_sc_list[0][0], toinsertDate[i])
                    print(f"[MY_APP_LOG] {insertquery}")
                else:
                    insertquery = \"""INSERT INTO "subSpecies"
                                ("id_subspecies", "name", "id_sc", "date") 
                                VALUES 
                                ({},'{}',{},{}) \""".format(Count, index, id_sc_list[0][0], dateNull)
                    print(f"[MY_APP_LOG] {insertquery}")"""
                insertquery = """INSERT INTO "subSpecies"
                                ("id_subspecies", "name", "id_sc", "date") 
                                VALUES 
                                ({},'{}',{},{}) """.format(Count, index, id_sc_list[0][0], toinsertDate[i])
                print(f"[MY_APP_LOG] {insertquery}")
                cursor.execute(insertquery)
                Count+=1
    conn.commit()
