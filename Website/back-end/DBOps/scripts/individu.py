import sqlite3
import pandas as pd
import numpy as np
import getPopulation

"""
insertIndividu is a function that will insert in a database a specific individu

:param data: a pandas dataframe
:param cursor: cursor to traverse the result of SQL query
:param conn: represent the connection to the database
:param admin: boolean value to authorize or not the overwrite
"""
def insertIndividu(data, cursor, conn, admin) :
    toinsert = data["SpecimenCode"].values.tolist()
    toinsertCountry = data["Country"].values.tolist()
    toinsertContinent = data["Continent"].values.tolist()
    toinsertEcozone = data["Ecozone"].values.tolist()
    toinsertID = data["Num_ID"].values.tolist()
    toinsertLatitude = data["Latitude"].tolist()
    toinsertLongitude = data["Longitude"].tolist()
    toinsertLocality = data["Locality"].values.tolist()
    toinsertNumber = data["Number"].values.tolist()
    toinsertCollection = data["Collection_Date"].tolist()
    toinsertSexe = data["Sexe"].tolist()
    
    toinsertOrder = data["Order"].values.tolist()
    toinsertSubOrder = data["Suborder"].values.tolist()
    toinsertTribu = data["Tribu"].values.tolist()
    toinsertFamily = data["Family"].values.tolist()
    toinsertSubFamily = data["Subfamily"].values.tolist()
    toinsertGenus = data["Genus"].values.tolist()
    toinsertSubGenus = data["Subgenus"].values.tolist()
    toinsertSpecies = data["species"].values.tolist()
    toinsertSubSpecies = data["Subspecies"].values.tolist()
    
    for i in range(0, len(toinsert)):

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
            
        popu = getPopulation.population(orderList[0],  suborderList[0], familyList[0], subFamilyList[0], tribuList[0], genusList[0],subGenusList[0],speciesList[0],subSpeciesList[0],cursor)
        duplicationquery =  """SELECT *
                                FROM "Individu" 
                                WHERE "id_individu" = (%s) """
        dataduplicationquery = (toinsert[i],)
        cursor.execute(duplicationquery, dataduplicationquery)
        id_indivList = cursor.fetchall()
        if id_indivList == [] :
            

            insertquery = """INSERT INTO "Individu"
                            ("id_individu", "box_id", "population_id", "continent", "country", "ecozone", "latitude", "longitude", "locality", "number", "collection_date", "sexe") 
                            VALUES 
                            ((%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s),(%s))"""
            datainsertquery = (toinsert[i], toinsertID[i], popu, toinsertContinent[i], toinsertCountry[i], toinsertEcozone[i], toinsertLatitude[i], toinsertLongitude[i],toinsertLocality[i], toinsertNumber[i], toinsertCollection[i], toinsertSexe[i])
            #print(insertquery)
            cursor.execute(insertquery, datainsertquery)

        elif(admin):
            
            
            insertquery = """UPDATE "Individu"
                             SET "box_id" = (%s), "population_id" =(%s), "continent"=(%s), "country"=(%s), "ecozone"=(%s), "latitude"=(%s), "longitude"=(%s), "locality"=(%s), "number"=(%s), "collection_date"=(%s), "sexe"=(%s) 
                            WHERE "id_individu" = (%s) """
            datainsertquery = (toinsertID[i], popu, toinsertContinent[i], toinsertCountry[i], toinsertEcozone[i], toinsertLatitude[i], toinsertLongitude[i],toinsertLocality[i], toinsertNumber[i], toinsertCollection[i], toinsertSexe[i], toinsert[i])
            #print(insertquery)
            cursor.execute(insertquery, datainsertquery)
    conn.commit()
