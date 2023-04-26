import sqlite3
import pandas as pd
import numpy as np
import math
import getPopulation


"""
insertPopulation is a function that will insert in a database a specific population

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
"""
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
        orderList = getPopulation.order(toinsertOrder[i], cursor, "id_order", "Order")
                
        #On recupere le sous ordre
        suborderList = getPopulation.order(toinsertSubOrder[i], cursor, "id_suborder", "subOrder")
                
        #On recupere la tribu
        tribuList = getPopulation.order(toinsertTribu[i], cursor, "id_tribu", "Tribu")
                 
        #On recupere la famille
        familyList = getPopulation.order(toinsertFamily[i], cursor, "id_family", "Family")
                
        #On recupere la sous famille
        subFamilyList = getPopulation.order(toinsertSubFamily[i], cursor, "id_subfamily", "subFamily")
                
        #On recupere le genus
        genusList = getPopulation.order(toinsertGenus[i], cursor, "id_genus", "Genus")
                
        #On recupere le sous genus
        subGenusList = getPopulation.order(toinsertSubGenus[i], cursor, "id_subgenus", "subGenus")
                
        #On recupere la species
        speciesList  = getPopulation.order(toinsertSpecies[i], cursor, "id_species", "Species")
                
        #On recupere la sous species
        subSpeciesList  =getPopulation.order(toinsertSubSpecies[i], cursor, "id_subspecies", "subSpecies")
  
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
                                                    WHERE "order_id" = (%s) """
                                            dataquerytest = [orderValue]
                                            if subOrderValue != None:
                                                query += """ AND "suborder_id" = {}"""
                                                dataquerytest.append(subOrderValue)
                                            else:
                                                query+= """ AND "suborder_id" IS NULL"""
                                            if tribuValue != None:
                                                query += """ AND "tribu_id" = (%s)"""
                                                dataquerytest.append(tribuValue)
                                            else:
                                                query+= """ AND "tribu_id" IS NULL"""
                                            if familyValue != None:
                                                query += """ AND "family_id" = (%s)"""
                                                dataquerytest.append(familyValue)
                                            else:
                                                query+= """ AND "family_id" IS NULL"""
                                            if subFamilyValue != None:
                                                query += """ AND "subFamily_id" = (%s)"""
                                                dataquerytest.append(subFamilyValue)
                                            else:
                                                query+= """ AND "subFamily_id" IS NULL"""
                                            if genusValue != None:
                                                query += """ AND "genus_id" = (%s)"""
                                                dataquerytest.append(genusValue)
                                            else:
                                                query+= """ AND "genus_id" IS NULL"""
                                            if subGenusValue != None:
                                                query += """ AND "subGenus_id" = (%s)"""
                                                dataquerytest.append(subGenusValue)
                                            else:
                                                query+= """ AND "subGenus_id" IS NULL"""
                                            if speciesValue != None:
                                                query += """ AND "species_id" = (%s)"""
                                                dataquerytest.append(speciesValue)
                                            else:
                                                query+= """ AND "species_id" IS NULL"""
                                            if subSpeciesValue != None:
                                                query += """ AND "subSpecies_id" = (%s)"""
                                                dataquerytest.append(subSpeciesValue)
                                            else:
                                                query+= """ AND "subSpecies_id" IS NULL"""
                                           
                                            cursor.execute(query, dataquerytest)
                                            if cursor.fetchall() == [] :

                            
            
                                                insertquery = """INSERT INTO "Population"
                                                            ("id_population", "order_id", "suborder_id" , "tribu_id" , "family_id" ,"subFamily_id", "genus_id", "subGenus_id" , "species_id", "subSpecies_id") 
                                                            VALUES 
                                                            ((%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s))"""
                                                datainsertquery = (Count, orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue,)
                                                cursor.execute(insertquery, datainsertquery)
                                                Count+=1
    conn.commit()
