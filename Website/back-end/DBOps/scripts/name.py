import sqlite3
import pandas as pd
import numpy as np

from psycopg2 import sql


"""
insertName is a function that will insert in a database in the corresponding table the name and the id

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
:param columnName: the name of the column from the dataframe needed
:param tableDB: the name of the table where the data need to be encoded
:param id_DB: the name of the id of the corresponding table from the database
"""

def insertName(data, cursor, conn, columnName, tableDB, id_DB) :
    toinsert = data[columnName].values.tolist()
                            
    duplicationquery = sql.SQL("select MAX({field}) from {table}").format(
    field=sql.Identifier(id_DB),
    table=sql.Identifier(tableDB))
    
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
            
        
            duplicationquery = sql.SQL("""SELECT *
                                FROM {table} 
                                WHERE "name" = (%s) """).format(
            table=sql.Identifier(tableDB))
            dataexistquery = ( index, )
            cursor.execute(duplicationquery, dataexistquery)
            if cursor.fetchall() == [] :
                
                insertquery = sql.SQL(""" INSERT INTO {table} ({field}, "name")
                                    VALUES
                                    ((%s), (%s))
                """).format(
                    field=sql.Identifier(id_DB),
                    table=sql.Identifier(tableDB))
               
                datainsertquery = (Count, index)
                cursor.execute(insertquery, datainsertquery)
                Count+=1
    conn.commit()
