import pandas as pd
import numpy as np
import math

def insertSpecies(data, cursor, conn) :
    toinsertName = data["species"].values.tolist()
    toinsertDate = data["Species_Date"].values.tolist()
    toinsertSc = data["Species_Descriptor"].values.tolist()
    duplicationquery =  """SELECT MAX(id_species)
                            FROM Species"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertName)):
        duplicationquery =  """SELECT *
                                FROM "Species" 
                                WHERE "name" = '{}'  """.format(toinsertName[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
            #S il y a un genus descriptor, on va recupere l'id du sc
            id_sc_query = """SELECT id_sc
                        FROM "Scientific"
                        WHERE name='{}' """.format(toinsertSc[i])
            cursor.execute(id_sc_query)
            id_sc_list = cursor.fetchall()
            if (len(id_sc_list)>1): #juste check mais normalement devrait pas aller la
                print("Pas normal")
                print(id_sc_list)
            dateNull = 0
            if not math.isnan(toinsertDate[i]):
                insertquery = """INSERT INTO Species
                                (id_species, name, id_sc, date) 
                                VALUES 
                                ({},"{}",{},{})""".format(Count, toinsertName[i], id_sc_list[0][0], toinsertDate[i])
                                #print(insertquery)
            else:
                insertquery = """INSERT INTO Species
                                (id_species, name, id_sc, date) 
                                VALUES 
                                ({},"{}",{},{})""".format(Count, toinsertName[i], id_sc_list[0][0], dateNull)
                                #print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
