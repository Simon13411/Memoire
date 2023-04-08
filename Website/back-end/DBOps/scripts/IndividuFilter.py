import pandas as pd
import numpy as np
import math
import sqlite3




def filterIndividu(olddf):

    checkCol = ["SpecimenCode", "Continent", "Country", "Ecozone", "Order", "Suborder", "Tribu", "Family","Subfamily", "Genus", "Subgenus", 
       "species", "Subspecies", "Num_ID", "Genus_Descriptor", "Species_Descriptor", "Subgenus_Descriptor", 
       "Subspecies_descriptor", "Genus_Date","Subgenus_Date","Species_Date","Subspecies_Date","Latitude", "Longitude"]
    colname = []
    for col in olddf.columns:
        if col not in checkCol:
            return [],1,pd.DataFrame, "pas les bonnes colonnes"
        else:
            colname.append(col)
    for col in checkCol:
        if col not in colname:
            
            return [],1,pd.DataFrame, "pas les bonnes colonnes"
    df = olddf[colname].copy()
    #print(colname)
    gooddf = pd.DataFrame(columns = colname)


    #How Many lines are not well encoded ?
    count = 0
    total = 0
    bad = []
    string =""
    for i, row in df.iterrows() :
        if math.isnan(row.Num_ID): #obliger d'avoir une box_id = 0 si individu pas dans uen boite
            bad.append(i+2)
            count += 1
            string +="il n'y a pas de boite mentionne"
            continue
        if not isinstance(row.SpecimenCode, str): #obliger d'avoir une box_id = 0 si individu pas dans uen boite
            bad.append(i+2)
            count += 1
            string +="il n'y a pas de Specimen code mentionne"
            continue
        order = row.Order.split("_")
        if (isinstance(row.Suborder, str)): suborder = row.Suborder.split("_")
        else: suborder=[""]
        if (isinstance(row.Family, str)): family = row.Family.split("_")
        else: family=[""]
        if (isinstance(row.Subfamily, str)): subfamily = row.Subfamily.split("_")
        else: subfamily=[""]
        if (isinstance(row.Tribu, str)): tribu = row.Tribu.split("_")
        else: tribu=[""]
        if (isinstance(row.Genus, str)): genus = row.Genus.split("_")
        else: genus=[""]
        if (isinstance(row.Subgenus, str)): subgenus = row.Subgenus.split("_")
        else: subgenus=[""]
        if (isinstance(row.species, str)): species = row.species.split("_")
        else: species=[""]
        if (isinstance(row.Subspecies, str)): subspecies = row.Subspecies.split("_")
        else: subspecies=[""]
        if(len(order)>1 and (len(suborder)>1 or len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs ordre et plusieurs sous classification"
            continue
        if(len(suborder)>1 and (len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs sousordre et plusieurs sous classification"
            continue
        if(len(family)>1 and( len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs famille et plusieurs sous classification"
            continue
        if( len(subfamily)>1 and( len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs sousfamille et plusieurs sous classification"
            continue
        if( len(tribu)>1 and( len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs tribu et plusieurs sous classification"
            continue
        if(len(genus)>1 and( len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs genre et plusieurs sous classification"
            continue
        if(len(subgenus)>1 and( len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            string +="plusieurs sousgenre et plusieurs sous classification"
            continue
        if(len(species)>1 and len(subspecies)>1):
            bad.append(i+2)
            count+=1
            string +="plusieurs espece et plusieurs sous classification"
            continue
        
        if not isinstance(row.Order, str)  or math.isnan(row.Num_ID):
            bad.append(i+2)
            count += 1
            string +="pas d'ordre"
            continue
        if not isinstance(row.Suborder, str) and not (row.Suborder != row.Suborder) :
            bad.append(i+2)
            count += 1
            string +="sousordre est un chiffre"
            continue
        if not isinstance(row.Family, str) and not (row.Family != row.Family) :
            count += 1
            bad.append(i+2)
            string +="famille est un chiffre"
            continue
        if not isinstance(row.Subfamily, str) and not (row.Subfamily != row.Subfamily):
            bad.append(i+2)
            count += 1
            string +="sousfamille est un chiffre"
            continue
        if not isinstance(row.Tribu, str) and not (row.Tribu != row.Tribu):
            bad.append(i+2)
            count += 1
            string +="tribu est un chiffre"
            continue
        if not isinstance(row.Genus, str) and not (row.Genus != row.Genus):
            bad.append(i+2)
            count += 1
            string +="genus est un chiffre"
            continue
        if not isinstance(row.Subgenus, str) and not (row.Subgenus != row.Subgenus) :
            bad.append(i+2)
            count += 1
            string +="sousgenre est un chiffre"
            continue
        if not isinstance(row.species, str) and not (row.species != row.species) :
            bad.append(i)
            count += 1
            string +="espece est un chiffre"
            continue
        if not isinstance(row.Subspecies, str) and not (row.Subspecies != row.Subspecies) :
            bad.append(i+2)
            count += 1
            string +="sousespece est un chiffre"
            continue
        
        if not isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor) :
            bad.append(i+2)
            count += 1
            string +="genus descriptor est un chiffre"
            continue
        
        #Subgenus_Descriptor filter
        if not isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor) :
            bad.append(i+2)
            count += 1
            string +="sousgenus descriptor est un chiffre"
            continue
        
        #Species_Descriptor filter
        if not isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor) :
            bad.append(i+2)
            count += 1
            string +="especes descriptor est un chiffre"
            continue
                
        #SubSpecies_Descriptor filter
        if not isinstance(row.Subspecies_descriptor, str) and not (row.Subspecies_descriptor != row.Subspecies_descriptor):
            bad.append(i+2)
            count += 1
            string +="sous espece descriptor est un chiffre"
            continue

        """if not isinstance(row.Genus_Date, str) and not (row.Genus_Date != row.Genus_Date):
            bad.append(i+2)
            count += 1
            continue
        
        if not isinstance(row.Subgenus_Date, str) and not (row.Subgenus_Date != row.Subgenus_Date):
            bad.append(i+2)
            count += 1
            continue
        
        if not isinstance(row.Species_Date, str) and not (row.Species_Date != row.Species_Date):
            bad.append(i+2)
            count += 1
            continue
        
        if not isinstance(row.Subspecies_Date, str) and not (row.Subspecies_Date != row.Subspecies_Date):
            bad.append(i+2)
            count += 1
            continue"""

        
        if not isinstance(row.Continent, str) and not (row.Continent != row.Continent):
            bad.append(i+2)
            count += 1
            string +="continent est un chiffre"
            continue
        
        if not isinstance(row.Country, str) and not (row.Country != row.Country):
            bad.append(i+2)
            count += 1
            string +="country est un chiffre"
            continue
        
        if not isinstance(row.Ecozone, str) and not (row.Ecozone != row.Ecozone):
            bad.append(i+2)
            count += 1
            string +="ecozone est un chiffre"
            continue
        
        if not isinstance(row.Latitude, str) and not (row.Latitude != row.Latitude):
            bad.append(i+2)
            count += 1
            string +="latitude est un chiffre"
            continue
        
        if not isinstance(row.Longitude, str) and not (row.Longitude != row.Longitude):
            bad.append(i+2)
            count += 1
            string +="longitude est un chiffre"
            continue
        
        if not isinstance(row.SpecimenCode, str) and not (row.SpecimenCode != row.SpecimenCode):
            bad.append(i+2)
            count += 1
            string +="specimencode est un chiffre"
            continue
    
    
        gooddf.loc[len(gooddf)] = row
    return bad, count, gooddf, ""


#print(taxonomydf["Specimen code"][0])
#print(locationdf)
