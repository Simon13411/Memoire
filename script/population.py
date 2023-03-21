import sqlite3
import pandas as pd
import numpy as np
import math


def order(insert, cursor):
    #On recupere la liste d'id de l'ordre
    if isinstance(insert, str) : ordernameList  = insert.split("_")
    else : ordernameList = [""]
    
    returnOrder = []
    for index in ordernameList:
        order = """SELECT "id_order"
                        FROM "Order"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(order)
        orderList = cursor.fetchall()
        returnOrder.append(orderList[0][0])
        if (len(orderList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(orderList)
    return returnOrder
                
    
def suborder(insert, cursor):
    #On recupere la liste d'id du suborder
    if isinstance(insert, str) : subordernameList  = insert.split("_")
    else : subordernameList = [""]
    
    returnSubOrder = []
    for index in subordernameList:
        
        suborder = """SELECT "id_suborder"
                        FROM "subOrder"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(suborder)
        suborderList = cursor.fetchall()
        returnSubOrder.append(suborderList[0][0])
        if (len(suborderList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(suborderList)
    return returnSubOrder
    
    
def tribu(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : tribunameList  = insert.split("_")
    else : tribunameList = [""]
    
    returnTribu = []
    for index in tribunameList:
        
        tribu = """SELECT "id_tribu"
                        FROM "Tribu"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(tribu)
        tribuList = cursor.fetchall()
        returnTribu.append(tribuList[0][0])
        if (len(tribuList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(tribuList)
    return returnTribu
    
    
def family(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : familynameList  = insert.split("_")
    else : familynameList = [""]
    returnFamily = []
    for index in familynameList:
        
        family = """SELECT "id_family"
                        FROM "Family"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(family)
        familyList = cursor.fetchall()
        returnFamily.append(familyList[0][0])
        if (len(familyList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(familyList)
    return returnFamily
    
    
def subfamily(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subfamilynameList  = insert.split("_")
    else : subfamilynameList = [""]
    returnSubFamily = []
    for index in subfamilynameList:
        
        subFamily = """SELECT "id_subfamily"
                        FROM "subFamily"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subFamily)
        subFamilyList = cursor.fetchall()
        returnSubFamily.append(subFamilyList[0][0])
        if (len(subFamilyList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subFamilyList)
    return returnSubFamily
    
    
def genus(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : genusnameList  = insert.split("_")
    else :genusnameList = [""]
    returnGenus = []
    for index in genusnameList:
        
        genus = """SELECT "id_genus"
                        FROM "Genus"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(genus)
        genusList = cursor.fetchall()
        returnGenus.append(genusList[0][0])
        if (len(genusList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(genusList)
    return returnGenus
    
    
def subgenus(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subgenusnameList  = insert.split("_")
    else : subgenusnameList = [""]
    returnSubGenus = []
    for index in subgenusnameList:
        
        subGenus = """SELECT "id_subgenus"
                        FROM "subGenus"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subGenus)
        subGenusList = cursor.fetchall()
        returnSubGenus.append(subGenusList[0][0])
        if (len(subGenusList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subGenusList)
    return returnSubGenus
    
    
def species(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : speciesnameList  = insert.split("_")
    else : speciesnameList = [""]
    returnSpecies = []
    for index in speciesnameList:
        
        species = """SELECT "id_species"
                        FROM "Species"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(species)
        speciesList = cursor.fetchall()
        returnSpecies.append(speciesList[0][0])
        if (len(speciesList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(speciesList)
    return returnSpecies
    
    
def subspecies(insert, cursor):
    #On recupere la liste d'id de la tribu
    if isinstance(insert, str) : subspeciesnameList  = insert.split("_")
    else : subspeciesnameList = [""]
    returnSubSpecies = []
    for index in subspeciesnameList:
        
        subSpecies = """SELECT "id_subspecies"
                        FROM "subSpecies"
                        WHERE "name"='{}' """.format(index)
        cursor.execute(subSpecies)
        subSpeciesList = cursor.fetchall()
        returnSubSpecies.append(subSpeciesList[0][0])
        if (len(subSpeciesList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subSpeciesList)
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
    print(result)
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
        subSpeciesList  =subspecies(toinsertSubSpecies, cursor)
            
        for orderValue in orderList:
            for subOrderValue in suborderList:
                for familyValue in familyList:
                    for subFamilyValue in subFamilyList:
                        for tribuValue in tribuList:
                            for genusValue in genusList:
                                for subGenusValue in subGenusList:
                                    for speciesValue in speciesList:
                                        for subSpeciesValue in subSpeciesList:
                                            
  
                                            duplicationquery =  """SELECT *
                                                                FROM "Population" 
                                                                WHERE "order_id" = '{}' and "suborder_id" = '{}' and "tribu_id" = '{}' and "family_id" = '{}' and "subFamily_id" = '{}' and "genus_id" = '{}' and "subGenus_id" = '{}' and "species_id" = '{}' and "subSpecies_id" = '{}' """.format(orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue) 
                                            cursor.execute(duplicationquery)
                                            if cursor.fetchall() == [] :

                            
            
                                                insertquery = """INSERT INTO "Population"
                                                            ("id_population", "order_id", "suborder_id" , "tribu_id" , "family_id" ,"subFamily_id", "genus_id", "subGenus_id" , "species_id", "subSpecies_id") 
                                                            VALUES 
                                                            ({},{},{},{},{},{},{},{},{},{})""".format(Count, orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue)
                                                print(insertquery)
                                                cursor.execute(insertquery)
                                                Count+=1
    conn.commit()
