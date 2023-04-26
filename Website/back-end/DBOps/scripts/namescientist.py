import sqlite3
import pandas as pd
import numpy as np
import math
from psycopg2 import sql


"""
insertNameScientist is a function that will insert in a database in the corresponding table the name, the id, the date and the id_sc

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
:param columnName: the name of the column from the dataframe needed
:param columnDescriptor: the name of the scientist associate to a specific classification
:param columnDate: the date at which the scientist has discover a specific classification
:param tableDB: the name of the table where the data need to be encoded
:param id_DB: the name of the id of the corresponding table from the database
"""

def insertNameScientist(data, cursor, conn, columnName, columnDescriptor, columnDate, tableDB, id_DB) :
    toinsertName = data[columnName].values.tolist()
    toinsertDate = data[columnDate].values.tolist()
    toinsertSc = data[columnDescriptor].values.tolist()
    duplicationquery = sql.SQL("select MAX({field}) from {table}").format(
    field=sql.Identifier(id_DB),
    table=sql.Identifier(tableDB))
    
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertName)):
        
        
        if isinstance(toinsertName[i], str) : genusList  = toinsertName[i].split("_")
        else : genusList = ["NULL"]
        
        
        for index in genusList:
            if index=="NULL": continue
        
            #if isinstance(toinsertSc[i], float): toinsertSc[i]="Unknown"
            
            duplicationquery = sql.SQL("""SELECT *
                                FROM {table} 
                                WHERE "name" = (%s) """).format(
            table=sql.Identifier(tableDB))
            dataexistquery = ( index, )
            cursor.execute(duplicationquery, dataexistquery)
            if cursor.fetchall() == [] :
            #S il y a un genus descriptor, on va recupere l'id du sc
                id_sc_query = """SELECT "id_sc"
                        FROM "Scientific"
                        WHERE "name"= (%s) """
                dataSC = (toinsertSc[i],)
                cursor.execute(id_sc_query, dataSC)
                id_sc_list = cursor.fetchall()
                
                if len(id_sc_list)==0:
                    insertquery = sql.SQL("""INSERT INTO {table}
                                ({field}, "name", "id_sc", "date") 
                                VALUES 
                                ((%s),(%s),(%s),(%s)) """).format(
                                field=sql.Identifier(id_DB),
                                table=sql.Identifier(tableDB))
                    datainsert = (Count, index, None, toinsertDate[i])

                    cursor.execute(insertquery, datainsert)
                else:
                    insertquery = sql.SQL("""INSERT INTO {table}
                                ({field}, "name", "id_sc", "date") 
                                VALUES 
                                ((%s),(%s),(%s),(%s)) """).format(
                                field=sql.Identifier(id_DB),
                                table=sql.Identifier(tableDB))
                    datainsert = (Count, index, id_sc_list[0][0], toinsertDate[i])
                    cursor.execute(insertquery, datainsert)
                Count+=1
    conn.commit()
