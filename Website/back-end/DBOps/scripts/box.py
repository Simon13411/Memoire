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
    
def population(order, suborder, family, subfamily, tribu, genus, subgenus, species, subspecies, cursor):
    #On recupere l'id de la population de la boite
    id_population =  """SELECT "id_population"
                                FROM "Population" 
                                WHERE "order_id" = '{}' and "suborder_id" = '{}' and "tribu_id" = '{}' and "family_id" = '{}' and "subFamily_id" = '{}' and "genus_id" = '{}' and "subGenus_id" = '{}' and "species_id" = '{}' and "subSpecies_id" = '{}' """.format(order, suborder, tribu, family, subfamily, genus, subgenus, species, subspecies) 
    cursor.execute(id_population)
    id_populationList = cursor.fetchall()
    if (len(id_populationList)>1): #juste check mais normalement devrait pas aller la
        print("Pas normal")
        print(id_populationList)
    if(len(id_populationList)==0):
        print("HEYYYYYY PAS BIEN")
        print(id_populationList)
    return id_populationList[0][0]

def insertBox(data, cursor, conn) :
    toinsertID = data["Num_ID"].values.tolist()
    toinsertLocation = data["Box_Localization"].values.tolist()
    toinsertMuseum = data["Museum"].values.tolist()
    toinsertParaType = data["Paratypes"].values.tolist()
    toinsertType = data["Types"].values.tolist()
    
    toinsertOrder = data["Order"].values.tolist()
    toinsertSubOrder = data["Suborder"].values.tolist()
    toinsertTribu = data["Tribu"].values.tolist()
    toinsertFamily = data["Family"].values.tolist()
    toinsertSubFamily = data["Subfamily"].values.tolist()
    toinsertGenus = data["Genus"].values.tolist()
    toinsertSubGenus = data["Subgenus"].values.tolist()
    toinsertSpecies = data["species"].values.tolist()
    toinsertSubSpecies = data["Subspecies"].values.tolist()
    
    
    toinsertGenusRange = data["Genus_range"].values.tolist()
    toinsertSpeciesRange = data["Species_range"].values.tolist()
    
    
    duplicationquery =  """SELECT MAX(id_box)
                            FROM "Box" """
    cursor.execute(duplicationquery)
    result = cursor.fetchall()
    Count = 1
    print(result)
    if result != [(None,)] :
        Count = result[0][0]+1

    for i in range(0, len(toinsertID)):
        
        if(toinsertID[i]==0):
            
            zeroExist = """SELECT *
                                FROM "Box" 
                                WHERE "id_box" = '{}' """.format(toinsertID[i])
            cursor.execute(zeroExist)
            if cursor.fetchall()==[]:
                #il y a pas encore de zero, on ajoute un id box 0, un id species range 0, un id genus range 0
                
                speciesRange = """ INSERT INTO "SpeciesRange"
                                    ("id_speciesrange", "range_begin", "range_end")
                                    VALUES
                                    ({}, '{}','{}') """.format(0,"","")
                cursor.execute(speciesRange)
                genusRange = """ INSERT INTO "GenusRange"
                                    ("id_genusrange", "range_begin", "range_end")
                                    VALUES
                                    ({}, '{}','{}') """.format(0,"","")
                cursor.execute(genusRange)
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
                
                insertquery = """INSERT INTO "Box"
                                ("id_box", "location", "speciesrange_id", "genusrange_id", "museum", "paratypes", "types") 
                                VALUES 
                                ({},'{}',{},{},'{}',{},{})""".format(0,"", 0, 0, "", 0, 0)
                print(insertquery)
                cursor.execute(insertquery)
            else:            
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
            subSpeciesList  =subspecies(toinsertSubSpecies, cursor)
        
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
                    
            
            #On recupere l'id du genus range
            genusFlag = False
            if isinstance(toinsertGenusRange[i], str):
            
                genusrangeList = toinsertGenusRange[i].split("_")
                start = genusrangeList[0]
                if(len(genusrangeList)==2):
                    end = genusrangeList[1]
                else:
                    end = ""   
                #S il y a un genus descriptor, on va recupere l'id du sc
                id_genusRange =  """SELECT "id_genusrange"
                                FROM "GenusRange" 
                                WHERE "range_begin" = '{}' and "range_end" = '{}'  """.format(start, end) 
                cursor.execute(id_genusRange)
                id_genusRangeList = cursor.fetchall()
                if (len(id_genusRangeList)>1): #juste check mais normalement devrait pas aller la
                    print("Pas normal")
                    print(id_genusRangeList)
                genusFlag = True
            #On recupere l'id du species range   
            speciesFlag = False
            if isinstance(toinsertSpeciesRange[i], str):
            
                speciesrangeList = toinsertSpeciesRange[i].split("_")
                speciesstart = speciesrangeList[0]
                if(len(speciesrangeList)==2):
                    speciesend = speciesrangeList[1]
                else:
                    speciesend = ""   
                #S il y a un genus descriptor, on va recupere l'id du sc
                id_speciesRange =  """SELECT "id_speciesrange"
                                FROM "SpeciesRange" 
                                WHERE "range_begin" = '{}' and "range_end" = '{}' """.format(speciesstart, speciesend) 
                cursor.execute(id_speciesRange)
                id_speciesRangeList = cursor.fetchall()
                if (len(id_speciesRangeList)>1): #juste check mais normalement devrait pas aller la
                    print("Pas normal")
                    print(id_speciesRangeList)
                speciesFlag = True
                
            location = toinsertLocation[i] if isinstance(toinsertLocation[i],str) else ""
            museum = toinsertMuseum[i] if isinstance(toinsertMuseum[i], str) else ""
            
            paratype = math.nan if isinstance(toinsertParaType[i], str) else toinsertParaType[i]
            paratype = paratype if not math.isnan(paratype) else 0
            paratype = 0 if isinstance(paratype, str) else paratype
            types = toinsertType[i] if not math.isnan(toinsertType[i]) else 0
            genusrangeID = id_genusRangeList[0][0] if genusFlag else "NULL"
            speciesrangeID = id_speciesRangeList[0][0] if speciesFlag else "NULL"
            print("type: ", types)
            print("paratype: ", paratype)
            print("id population: ", populationList)
            print("location: ", location)
            print("museum: ", museum)
            print("genus range: ", genusrangeID)
            print("species range: ", speciesrangeID)
            
            
                
            insertquery = """INSERT INTO "Box"
                                ("id_box", "location", "speciesrange_id", "genusrange_id", "museum", "paratypes", "types") 
                                VALUES 
                                ({},'{}',{},{},'{}',{},{})""".format(toinsertID[i], location, speciesrangeID, genusrangeID, museum, paratype, types)
            print(insertquery)
            cursor.execute(insertquery)
            Count+=1
    conn.commit()
