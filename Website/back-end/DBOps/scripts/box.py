import sqlite3
import pandas as pd
import numpy as np
import math
import getPopulation

"""
insertBox is a function that will insert in a database a specific box

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
:param admin: boolean value to authorize or not the overwrite
"""
def insertBox(data, cursor, conn, admin) :
    toinsertID = data["Num_ID"].values.tolist()
    toinsertLocation = data["Box_Localization"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsertMuseum = data["Museum"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsertParaType = data["Paratypes"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
    toinsertType = data["Types"].fillna(np.nan).replace([np.nan], [None]).values.tolist()
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
                                            populationList.append(getPopulation.population(orderValue,  subOrderValue, familyValue, subFamilyValue, tribuValue, genusValue,subGenusValue,speciesValue,subSpeciesValue,cursor))
             
        duplicationquery =  """SELECT *
                                FROM "Box" 
                                WHERE "id_box" = (%s) """
        dataduplicationquery  = (toinsertID[i],)
        cursor.execute(duplicationquery, dataduplicationquery)
        if cursor.fetchall() == [] :
            
            collection = """ SELECT "id_collection" 
                FROM "Collection"
                WHERE "name" = (%s) """
            datacollection = (toinsertCollection[i],)
            cursor.execute(collection, datacollection)
            collectionList = cursor.fetchall()
            #print("colection", collectionList[0][0])
            #location = toinsertLocation[i] if isinstance(toinsertLocation[i],str) else ""
            #museum = toinsertMuseum[i] if isinstance(toinsertMuseum[i], str) else ""
            
            #print("id population: ", populationList)
            #print("location: ", location)
            #print("museum: ", museum)
            
            
            
                
            insertquery = """INSERT INTO "Box"
                                ("id_box", "collection_id" ,"location", "museum", "paratypes", "types") 
                                VALUES 
                                ((%s),(%s),(%s),(%s),(%s),(%s))"""
            datainsertquery = (toinsertID[i], collectionList[0][0], toinsertLocation[i], toinsertMuseum[i], toinsertParaType[i], toinsertType[i])
            #print(insertquery)
            cursor.execute(insertquery, datainsertquery)

            for pop in populationList:
                #print(pop)
                duplicate = """SELECT *
                             FROM "PopuBox"
                             WHERE "box_id" = (%s) and "population_id" = (%s) """
                dataduplicate = (toinsertID[i], pop)
                cursor.execute(duplicate, dataduplicate)
                if(cursor.fetchall()==[]):
                    insertPopuBox = """INSERT INTO "PopuBox"
                                     ("population_id", "box_id")
                                     VALUES
                                     ((%s),(%s)) """
                    datainsertPopuBox = (pop, toinsertID[i])
                    cursor.execute(insertPopuBox, datainsertPopuBox)
                    
            Count+=1
        elif(admin):
            
            deletePopuBox= """
                        DELETE
                        FROM "PopuBox"
                        WHERE "box_id"=(%s) """
            datadeletePopuBox = (toinsertID[i],)
            #print(deletePopuBox)
            cursor.execute(deletePopuBox, datadeletePopuBox)
            
           
            for pop in populationList:
                #print(pop)
                duplicate = """SELECT *
                             FROM "PopuBox"
                             WHERE "box_id" = (%s) and "population_id" = (%s)"""
                dataduplicate = (toinsertID[i], pop)
                cursor.execute(duplicate, dataduplicate)
                if(cursor.fetchall()==[]):
                    insertPopuBox = """INSERT INTO "PopuBox"
                                     ("population_id", "box_id")
                                     VALUES
                                     ((%s), (%s)) """
                    datainsertbox = (pop, toinsertID[i])
                    cursor.execute(insertPopuBox, datainsertbox)
                    
            
            
            collection = """ SELECT "id_collection" 
                            FROM "Collection"
                            WHERE "name" = (%s) """
            datacollection = (toinsertCollection[i],)
            cursor.execute(collection, datacollection)
            collectionList = cursor.fetchall()
            #print("colection", collectionList[0][0])
            
            #print("id population: ", populationList)
            #print("location: ", location)
            #print("museum: ", museum)
            
            
            
                
            insertquery = """UPDATE  "Box"
                            SET  "collection_id" = (%s) ,"location" = (%s), "museum"= (%s), "paratypes" = (%s), "types"= (%s)
                            WHERE "id_box" = (%s) """
            datainsertquery = ( collectionList[0][0], toinsertLocation[i], toinsertMuseum[i], toinsertParaType[i], toinsertType[i],toinsertID[i])
            #print(insertquery)
            cursor.execute(insertquery, datainsertquery)
                
    conn.commit()
