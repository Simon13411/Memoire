import sqlite3
import pandas as pd
import numpy as np
import math

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
    
    duplicationquery =  """SELECT MAX(id_population)
                            FROM Population"""
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertOrder)):
        #On recupere l'ordre
        order = """SELECT id_order
                        FROM Ordre
                        WHERE name="{}" """.format(toinsertOrder[i])
        cursor.execute(order)
        orderList = cursor.fetchall()
        if (len(orderList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(orderList)
                
        #On recupere le sous ordre
        suborder = """SELECT id_suborder
                        FROM subOrdre
                        WHERE name="{}" """.format(toinsertSubOrder[i])
        cursor.execute(suborder)
        suborderList = cursor.fetchall()
        if (len(suborderList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(suborderList)
                
        #On recupere la tribu
        tribu = """SELECT id_tribu
                        FROM Tribu
                        WHERE name="{}" """.format(toinsertTribu[i])
        cursor.execute(tribu)
        tribuList = cursor.fetchall()
        if (len(tribuList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(tribuList)
            
                    
        #On recupere la famille
        family = """SELECT id_family
                        FROM Family
                        WHERE name="{}" """.format(toinsertFamily[i])
        cursor.execute(family)
        familyList = cursor.fetchall()
        if (len(familyList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(familyList)
                
        #On recupere la sous famille
        subFamily = """SELECT id_subfamily
                        FROM subFamily
                        WHERE name="{}" """.format(toinsertSubFamily[i])
        cursor.execute(subFamily)
        subFamilyList = cursor.fetchall()
        if (len(subFamilyList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subFamilyList)
                
        #On recupere le genus
        genus = """SELECT id_genus
                        FROM Genus
                        WHERE name="{}" """.format(toinsertGenus[i])
        cursor.execute(genus)
        genusList = cursor.fetchall()
        if (len(genusList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(genusList)
                
        #On recupere le sous genus
        subGenus = """SELECT id_subgenus
                        FROM subGenus
                        WHERE name="{}" """.format(toinsertSubGenus[i])
        cursor.execute(subGenus)
        subGenusList = cursor.fetchall()
        if (len(subGenusList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subGenusList)
                
        #On recupere la species
        species = """SELECT id_species
                        FROM Species
                        WHERE name="{}" """.format(toinsertSpecies[i])
        cursor.execute(species)
        speciesList = cursor.fetchall()
        if (len(speciesList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(speciesList)
                
        #On recupere la sous species
        subSpecies = """SELECT id_subspecies
                        FROM subSpecies
                        WHERE name="{}" """.format(toinsertSubSpecies[i])
        cursor.execute(subSpecies)
        subSpeciesList = cursor.fetchall()
        if (len(subSpeciesList)>1): #juste check mais normalement devrait pas aller la
            print("Pas normal")
            print(subSpeciesList)
            
        #Si nan dans l'excel on remplace par l'id 0
        orderValue = orderList[0][0] if isinstance(toinsertOrder[i],str) else 0
                
        subOrderValue = suborderList[0][0] if isinstance(toinsertSubOrder[i],str) else 0
                    
        tribuValue = tribuList[0][0] if isinstance(toinsertTribu[i],str) else 0
                    
        familyValue = familyList[0][0] if isinstance(toinsertFamily[i],str) else 0
                    
        subFamilyValue = subFamilyList[0][0] if isinstance(toinsertSubFamily[i],str) else 0
     
        genusValue = genusList[0][0] if isinstance(toinsertGenus[i],str) else 0
            
        subGenusValue = subGenusList[0][0] if isinstance(toinsertSubGenus[i],str) else 0
       
        speciesValue = speciesList[0][0] if isinstance(toinsertSpecies[i],str) else 0
      
        subSpeciesValue = subSpeciesList[0][0] if isinstance(toinsertSubSpecies[i],str) else 0
  
        duplicationquery =  """SELECT *
                                FROM Population 
                                WHERE order_id = "{}" and suborder_id = "{}" and tribu_id = "{}" and family_id = "{}" and subFamily_id = "{}" and genus_id = "{}" and subGenus_id = "{}" and species_id = "{}" and subSpecies_id = "{}" """.format(orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue) 
        cursor.execute(duplicationquery)
        if cursor.fetchall() == [] :

                            
            
            insertquery = """INSERT INTO Population
                            (id_population, order_id, suborder_id , tribu_id , family_id ,subFamily_id, genus_id, subGenus_id , species_id, subSpecies_id) 
                            VALUES 
                            ({},{},{},{},{},{},{},{},{},{})""".format(Count, orderValue, subOrderValue, tribuValue, familyValue, subFamilyValue, genusValue, subGenusValue, speciesValue, subSpeciesValue)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()