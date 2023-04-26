import sqlite3
import pandas as pd
import numpy as np
import math
from psycopg2 import sql

def order(insert, cursor, id_column, table):
    #On recupere la liste d'id de l'ordre
    if isinstance(insert, str) : ordernameList  = insert.split("_")
    else : return [None]
    
    returnOrder = []
    for index in ordernameList:
        order = sql.SQL("""select MAX({field}) from {table} where "name"= (%s) """).format(
        field=sql.Identifier(id_column),
        table=sql.Identifier(table))
        dataorder = (index,)
        cursor.execute(order, dataorder)
        orderList = cursor.fetchall()
        returnOrder.append(orderList[0][0])
    return returnOrder
                

def population(order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies, cursor):
    query = """
           SELECT * FROM "Population"
           WHERE "order_id" = (%s) """
    dataquerytest = [order]
    if suborder != None:
        query += """ AND "suborder_id" = {}"""
        dataquerytest.append(suborder)
    else:
        query+= """ AND "suborder_id" IS NULL"""
    if tribu != None:
        query += """ AND "tribu_id" = (%s)"""
        dataquerytest.append(tribu)
    else:
        query+= """ AND "tribu_id" IS NULL"""
    if family != None:
        query += """ AND "family_id" = (%s)"""
        dataquerytest.append(family)
    else:
        query+= """ AND "family_id" IS NULL"""
    if subfamily != None:
        query += """ AND "subFamily_id" = (%s)"""
        dataquerytest.append(subfamily)
    else:
        query+= """ AND "subFamily_id" IS NULL"""
    if genus != None:
        query += """ AND "genus_id" = (%s)"""
        dataquerytest.append(genus)
    else:
        query+= """ AND "genus_id" IS NULL"""
    if subgenus != None:
        query += """ AND "subGenus_id" = (%s)"""
        dataquerytest.append(subgenus)
    else:
        query+= """ AND "subGenus_id" IS NULL"""
    if species != None:
        query += """ AND "species_id" = (%s)"""
        dataquerytest.append(species)
    else:
        query+= """ AND "species_id" IS NULL"""
    if subspecies != None:
        query += """ AND "subSpecies_id" = (%s)"""
        dataquerytest.append(subspecies)
    else:
        query+= """ AND "subSpecies_id" IS NULL"""
    cursor.execute(query, dataquerytest)
    id_populationList = cursor.fetchall()
    return id_populationList[0][0]
