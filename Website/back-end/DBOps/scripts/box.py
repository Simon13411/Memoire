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
    
    
def population(order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies, cursor):
    #On recupere l'id de la population de la boite
    query = """
    SELECT * FROM "Population"
    WHERE "order_id" = {}
    """.format(order)

    if suborder != "NULL":
        query += """ AND "suborder_id" = {}""".format(suborder)
    else:
        query+= """ AND "suborder_id" IS NULL"""
    if tribu != "NULL":
        query += """ AND "tribu_id" = {}""".format(tribu)
    else:
        query+= """ AND "tribu_id" IS NULL"""
    if family != "NULL":
        query += """ AND "family_id" = {}""".format(family)
    else:
        query+= """ AND "family_id" IS NULL"""
    if subfamily != "NULL":
        query += """ AND "subFamily_id" = {}""".format(subfamily)
    else:
        query+= """ AND "subFamily_id" IS NULL"""
    if genus != "NULL":
        query += """ AND "genus_id" = {}""".format(genus)
    else:
        query+= """ AND "genus_id" IS NULL"""
    if subgenus != "NULL":
        query += """ AND "subGenus_id" = {}""".format(subgenus)
    else:
        query+= """ AND "subGenus_id" IS NULL"""
    if species != "NULL":
        query += """ AND "species_id" = {}""".format(species)
    else:
        query+= """ AND "species_id" IS NULL"""
    if subspecies != "NULL":
        query += """ AND "subSpecies_id" = {}""".format(subspecies)
    else:
        query+= """ AND "subSpecies_id" IS NULL"""   
    cursor.execute(query)
    id_populationList = cursor.fetchall()
    return id_populationList[0][0]

def insertBox(data, cursor, conn, admin) :
    toinsertID = data["Num_ID"].values.tolist()
    toinsertLocation = data["Box_Localization"].values.tolist()
    toinsertMuseum = data["Museum"].values.tolist()
    toinsertParaType = data["Paratypes"].fillna("NULL").values.tolist()
    toinsertType = data["Types"].fillna("NULL").values.tolist()
    toinsertCollection = data["Collection_Name"].tolist()
    toinsertOrder = data["Order"].values.tolist()
    toinsertSubOrder = data["Suborder"].values.tolist()
    toinsertTribu = data["Tribu"].values.tolist()
    toinsertFamily = data["Family"].values.tolist()
    toinsertSubFamily = data["Subfamily"].values.tolist()
    toinsertGenus = data["Genus"].values.tolist()
    toinsertSubGenus = data["Subgenus"].values.tolist()
    toinsertSpecies = data["species"].values.tolist()
    toinsertSubSpecies = data["Subspecies"].values.tolist()
    
    
    
    
    duplicationquery =  """SELECT MAX("id_box")
                            FROM "Box" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    #print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertID)):
          
               
        duplicationquery =  """SELECT *
                                FROM "Box" 
                                WHERE "id_box" = {} """.format(toinsertID[i]) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :
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
        
            populationList = []
            for orderValue in orderList:
                for subOrderValue in suborderList:
                    for familyValue in familyList:
                        for subFamilyValue in subFamilyList:
                            for tribuValue in tribuList:
                                for genusValue in genusList:
                                    for subGenusValue in subGenusList:
                                        for speciesValue in speciesList:
                                            for subSpeciesValue in subSpeciesList:
                                            
                                                #Il va falloir recuperer toutes les id populations qui existent avec les id de classement
                                                #qu'on a 
                                                populationList.append(population(orderValue,  subOrderValue, familyValue, subFamilyValue, tribuValue, genusValue,subGenusValue,speciesValue,subSpeciesValue,cursor))
             
            collection = """ SELECT "id_collection" 
                FROM "Collection"
                WHERE "name" = '{}' """.format(toinsertCollection[i])
            cursor.execute(collection)
            collectionList = cursor.fetchall()
            #print("colection", collectionList[0][0])
            location = toinsertLocation[i] if isinstance(toinsertLocation[i],str) else ""
            museum = toinsertMuseum[i] if isinstance(toinsertMuseum[i], str) else ""
            
            #print("id population: ", populationList)
            #print("location: ", location)
            #print("museum: ", museum)
            
            
            
                
            insertquery = """INSERT INTO "Box"
                                ("id_box", "collection_id" ,"location", "museum", "paratypes", "types") 
                                VALUES 
                                ({}, {},'{}','{}',{},{})""".format(toinsertID[i], collectionList[0][0], location, museum, toinsertParaType[i], toinsertType[i])
            #print(insertquery)
            cursor.execute(insertquery)

            for pop in populationList:
                #print(pop)
                duplicate = """SELECT *
                             FROM "PopuBox"
                             WHERE "box_id" = {} and "population_id" = {} """.format(toinsertID[i], pop)
                cursor.execute(duplicate)
                if(cursor.fetchall()==[]):
                    insertPopuBox = """INSERT INTO "PopuBox"
                                     ("population_id", "box_id")
                                     VALUES
                                     ({},{}) """.format(pop, toinsertID[i])
                    cursor.execute(insertPopuBox)
                    
            Count+=1
        elif(admin):
            
            deletePopuBox= """
                        DELETE
                        FROM "PopuBox"
                        WHERE "box_id"={} """.format(toinsertID[i])
            #print(deletePopuBox)
            cursor.execute(deletePopuBox)
            
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
        
            populationList = []
            for orderValue in orderList:
                for subOrderValue in suborderList:
                    for familyValue in familyList:
                        for subFamilyValue in subFamilyList:
                            for tribuValue in tribuList:
                                for genusValue in genusList:
                                    for subGenusValue in subGenusList:
                                        for speciesValue in speciesList:
                                            for subSpeciesValue in subSpeciesList:
                                            
                                                #Il va falloir recuperer toutes les id populations qui existent avec les id de classement
                                                #qu'on a 
                                                populationList.append(population(orderValue,  subOrderValue, familyValue, subFamilyValue, tribuValue, genusValue,subGenusValue,speciesValue,subSpeciesValue,cursor))
             
            for pop in populationList:
                #print(pop)
                duplicate = """SELECT *
                             FROM "PopuBox"
                             WHERE "box_id" = {} and "population_id" = {} """.format(toinsertID[i], pop)
                cursor.execute(duplicate)
                if(cursor.fetchall()==[]):
                    insertPopuBox = """INSERT INTO "PopuBox"
                                     ("population_id", "box_id")
                                     VALUES
                                     ({},{}) """.format(pop, toinsertID[i])
                    cursor.execute(insertPopuBox)
                    
            
            
            collection = """ SELECT "id_collection" 
                            FROM "Collection"
                            WHERE "name" = '{}' """.format(toinsertCollection[i])
            cursor.execute(collection)
            collectionList = cursor.fetchall()
            #print("colection", collectionList[0][0])
            location = toinsertLocation[i] if isinstance(toinsertLocation[i],str) else ""
            museum = toinsertMuseum[i] if isinstance(toinsertMuseum[i], str) else ""
            
            #print("id population: ", populationList)
            #print("location: ", location)
            #print("museum: ", museum)
            
            
            
                
            insertquery = """UPDATE  "Box"
                            SET  "collection_id" = {} ,"location" = '{}', "museum"= '{}', "paratypes" = {}, "types"= {}
                            WHERE "id_box" = {} """.format( collectionList[0][0], location, museum, toinsertParaType[i], toinsertType[i],toinsertID[i])
            #print(insertquery)
            cursor.execute(insertquery)
                
    conn.commit()
