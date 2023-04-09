import sqlite3
import pandas as pd
import numpy as np
import math


def order(insert, cursor):
    #On recupere la liste d'id de l'ordre
    if isinstance(insert, str) : ordernameList  = insert.split("_")
    else : ordernameList = ["NULL"]
    
    returnOrder = []
    for index in ordernameList:
        if index=="NULL": 
            returnOrder.append("NULL")
            continue
        order = """SELECT "id_order"
                        FROM "Order"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(order)
        orderList = cursor.fetchall()
        returnOrder.append(orderList[0][0])
    return returnOrder
                
    
def suborder(insert, cursor):
    #On recupere la liste d'id du suborder
    if isinstance(insert, str) : subordernameList  = insert.split("_")
    else : subordernameList = ["NULL"]
    
    returnSubOrder = []
    for index in subordernameList:
        if index=="NULL": 
            returnSubOrder.append("NULL")
            continue
        
        suborder = """SELECT "id_suborder"
                        FROM "subOrder"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(suborder)
        suborderList = cursor.fetchall()
        #print("suborderList:" , returnSubOrder)
        returnSubOrder.append(suborderList[0][0])
    return returnSubOrder
    
    
def tribu(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : tribunameList  = insert.split("_")
    else : tribunameList = ["NULL"]
    
    returnTribu = []
    for index in tribunameList:
        if index=="NULL": 
            returnTribu.append("NULL")
            continue
        
        tribu = """SELECT "id_tribu"
                        FROM "Tribu"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(tribu)
        tribuList = cursor.fetchall()
        returnTribu.append(tribuList[0][0])
    return returnTribu
    
    
def family(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : familynameList  = insert.split("_")
    else : familynameList = ["NULL"]
    returnFamily = []
    for index in familynameList:
        if index=="NULL": 
            returnFamily.append("NULL")
            continue
        
        family = """SELECT "id_family"
                        FROM "Family"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(family)
        familyList = cursor.fetchall()
        returnFamily.append(familyList[0][0])
    return returnFamily
    
    
def subfamily(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subfamilynameList  = insert.split("_")
    else : subfamilynameList = ["NULL"]
    returnSubFamily = []
    for index in subfamilynameList:
        if index=="NULL": 
            returnSubFamily.append("NULL")
            continue
        
        subFamily = """SELECT "id_subfamily"
                        FROM "subFamily"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subFamily)
        subFamilyList = cursor.fetchall()
        returnSubFamily.append(subFamilyList[0][0])
    return returnSubFamily
    
    
def genus(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : genusnameList  = insert.split("_")
    else :genusnameList = ["NULL"]
    returnGenus = []
    for index in genusnameList:
        if index=="NULL": 
            returnGenus.append("NULL")
            continue
        
        genus = """SELECT "id_genus"
                        FROM "Genus"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(genus)
        genusList = cursor.fetchall()
        returnGenus.append(genusList[0][0])
    return returnGenus
    
    
def subgenus(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subgenusnameList  = insert.split("_")
    else : subgenusnameList = ["NULL"]
    returnSubGenus = []
    for index in subgenusnameList:
        if index=="NULL": 
            returnSubGenus.append("NULL")
            continue
        
        subGenus = """SELECT "id_subgenus"
                        FROM "subGenus"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subGenus)
        subGenusList = cursor.fetchall()
        returnSubGenus.append(subGenusList[0][0])
    return returnSubGenus
    
    
def species(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : speciesnameList  = insert.split("_")
    else : speciesnameList = ["NULL"]
    returnSpecies = []
    for index in speciesnameList:
        if index=="NULL": 
            returnSpecies.append("NULL")
            continue
        
        species = """SELECT "id_species"
                        FROM "Species"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(species)
        speciesList = cursor.fetchall()
        returnSpecies.append(speciesList[0][0])
    return returnSpecies
    
    
def subspecies(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subspeciesnameList  = insert.split("_")
    else : subspeciesnameList = ["NULL"]
    returnSubSpecies = []
    for index in subspeciesnameList:
        if index=="NULL": 
            returnSubSpecies.append("NULL") 
            continue
        
        subSpecies = """SELECT "id_subspecies"
                        FROM "subSpecies"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subSpecies)
        subSpeciesList = cursor.fetchall()
        returnSubSpecies.append(subSpeciesList[0][0])
    return returnSubSpecies
    
    









def insertPopulation(data, cursor, conn) :
    toinsertOrder = data["Order"].values.tolist()
    toinsertSubOrder = data["Suborder"].values.tolist()
    toinsertTribu = data["Tribu"].values.tolist()
    toinsertFamily = data["Family"].values.tolist()
    toinsertSubFamily = data["Subfamily"].values.tolist()
    toinsertGenus = data["Genus"].values.tolist()
    toinsertSubGenus = data["Subgenus"].values.tolist()
    toinsertSpecies = data["species"].values.tolist()
    toinsertSubSpecies = data["Subspecies"].values.tolist()
    
    duplicationquery =  """SELECT MAX("id_population")
                            FROM "Population" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertOrder)):
        #On recupere l'ordre
        orderList = order(toinsertOrder[i], cursor)
                
        #On recupere le sous ordre
        suborderList = suborder(toinsertSubOrder[i], cursor)
                
        #On recupere la tribu
        tribuList = tribu(toinsertTribu[i], cursor)
                 
        #On recupere la famille
        familyList = family(toinsertFamily[i], cursor)
                
        #On recupere la sous famille
        subFamilyList = subfamily(toinsertSubFamily[i], cursor)
                
        #On recupere le genus
        genusList = genus(toinsertGenus[i], cursor)
                
        #On recupere le sous genus
        subGenusList = subgenus(toinsertSubGenus[i], cursor)
                
        #On recupere la species
        speciesList  = species(toinsertSpecies[i], cursor)
                
        #On recupere la sous species
        subSpeciesList  =subspecies(toinsertSubSpecies[i], cursor)
        """query = \"""
    SELECT * FROM Population
    WHERE order_id = {}
\""".format(order_id)

if suborder_id is not None:
    query += " AND suborder_id = {}".format(suborder_id)
if tribu_id is not None:
    query += " AND tribu_id = {}".format(tribu_id)
if family_id is not None:
    query += " AND family_id = {}".format(family_id)
if subFamily_id is not None:
    query += " AND subFamily_id = {}".format(subFamily_id)
if genus_id is not None:
    query += " AND genus_id = {}".format(genus_id)
if subGenus_id is not None:
    query += " AND subGenus_id = {}".format(subGenus_id)
if species_id is not None:
    query += " AND species_id = {}".format(species_id)
if subSpecies_id is not None:
    query += " AND subSpecies_id = {}".format(subSpecies_id)
        """           
        for orderValue in orderList:
            for subOrderValue in suborderList:
                for familyValue in familyList:
                    for subFamilyValue in subFamilyList:
                        for tribuValue in tribuList:
                            for genusValue in genusList:
                                for subGenusValue in subGenusList:
                                    for speciesValue in speciesList:
                                        for subSpeciesValue in subSpeciesList:
                                            
                                            query = """
                                                    SELECT * FROM "Population"
                                                    WHERE "order_id" = {}
                                                    """.format(orderValue)

                                            if subOrderValue != "NULL":
                                                query += """ AND "suborder_id" = {}""".format(subOrderValue)
                                            else:
                                                query+= """ AND "suborder_id" IS NULL"""
                                            if tribuValue != "NULL":
                                                query += """ AND "tribu_id" = {}""".format(tribuValue)
                                            else:
                                                query+= """ AND "tribu_id" IS NULL"""
                                            if familyValue != "NULL":
                                                query += """ AND "family_id" = {}""".format(familyValue)
                                            else:
                                                query+= """ AND "family_id" IS NULL"""
                                            if subFamilyValue != "NULL":
                                                query += """ AND "subFamily_id" = {}""".format(subFamilyValue)
                                            else:
                                                query+= """ AND "subFamily_id" IS NULL"""
                                            if genusValue != "NULL":
                                                query += """ AND "genus_id" = {}""".format(genusValue)
                                            else:
                                                query+= """ AND "genus_id" IS NULL"""
                                            if subGenusValue != "NULL":
                                                query += """ AND "subGenus_id" = {}""".format(subGenusValue)
                                            else:
                                                query+= """ AND "subGenus_id" IS NULL"""
                                            if speciesValue != "NULL":
                                                query += """ AND "species_id" = {}""".format(speciesValue)
                                            else:
                                                query+= """ AND "species_id" IS NULL"""
                                            if subSpeciesValue != "NULL":
                                                query += """ AND "subSpecies_id" = {}""".format(subSpeciesValue)
                                            else:
                                                query+= """ AND "subSpecies_id" IS NULL"""
                                            cursor.execute(query)
                                            if cursor.fetchall() == [] :

                            
            
                                                insertquery = """INSERT INTO "Population"
                                                            ("id_population", "order_id", "suborder_id" , "tribu_id" , "family_id" ,"subFamily_id", "genus_id", "subGenus_id" , "species_id", "subSpecies_id") 
                                                            VALUES 
                                                            ({},{},{},{},{},{},{},{},{},{})""".format(Count, orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue)
                                                #print(insertquery)
                                                cursor.execute(insertquery)
                                                Count+=1
    conn.commit()
