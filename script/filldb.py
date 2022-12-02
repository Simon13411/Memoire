import sqlite3
import pandas as pd
import numpy as np

def insertOrder() :
    toinsert = data["Order"].values.tolist()
    duplicationquery =  """SELECT MAX(id_order)
                            FROM Ordre"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    if result != [] :
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
            print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()


file = pd.ExcelFile("FilteredData.xlsx")

data = pd.read_excel(file)

#Connexion
database = "Entomologie.db"
conn = sqlite3.connect(database)
cursor = conn.cursor()
print("Successfully Connected to the db")

insertOrder()
cursor.close()