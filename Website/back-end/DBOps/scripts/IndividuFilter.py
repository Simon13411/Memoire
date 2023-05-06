import pandas as pd
import numpy as np
import math

def filter_values(val):
    if isinstance(val, float):
        if val.is_integer():
            return int(val)
        elif math.isnan(val):
            return None
        else:
            return "BadEncodingDate"
    else:
        return val


def filterIndividu(olddf):

    checkCol = ["SpecimenCode", "Continent", "Country", "Ecozone", "Order", "Suborder", "Tribu", "Family","Subfamily", "Genus", "Subgenus", 
       "species", "Subspecies", "Num_ID", "Genus_Descriptor", "Species_Descriptor", "Subgenus_Descriptor", 
       "Subspecies_descriptor", "Genus_Date","Subgenus_Date","Species_Date","Subspecies_Date","Latitude", "Longitude", "Locality", "Number", 
       "Collection_Date", "Sexe"]
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
    reasons = []
    for i, row in df.iterrows() :
        if math.isnan(row.Num_ID): #obliger d'avoir une box_id = 0 si individu pas dans uen boite
            bad.append(i+2)
            count += 1
            reasons.append("There is no box mentioned")
            continue
        if not isinstance(row.SpecimenCode, str): #obliger d'avoir une box_id = 0 si individu pas dans uen boite
            bad.append(i+2)
            count += 1
            reasons.append("There is no specimen code mentioned")
            continue
        if (isinstance(row.Order, str)):
            order = row.Order.split("_")
        else:
            bad.append(i+2)
            count+=1
            reasons.append("There is no order")
            continue
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
            reasons.append("several order and several sub classification")
            continue
        if(len(suborder)>1 and (len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several suborder and several sub classification")
            continue
        if(len(family)>1 and( len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several family and several sub classification")
            continue
        if( len(subfamily)>1 and( len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several subfamily and several sub classification")
            continue
        if( len(tribu)>1 and( len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several tribu and several sub classification")
            continue
        if(len(genus)>1 and( len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several genus and several sub classification")
            continue
        if(len(subgenus)>1 and( len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            count+=1
            reasons.append("several subgenus and several sub classification")
            continue
        if(len(species)>1 and len(subspecies)>1):
            bad.append(i+2)
            count+=1
            reasons.append("several species and several sub classification")
            continue
        
        if not isinstance(row.Suborder, str) and not (row.Suborder != row.Suborder) :
            bad.append(i+2)
            count += 1
            reasons.append("suborder is a number")
            continue
        if not isinstance(row.Family, str) and not (row.Family != row.Family) :
            count += 1
            bad.append(i+2)
            reasons.append("family is a number")
            continue
        if not isinstance(row.Subfamily, str) and not (row.Subfamily != row.Subfamily):
            bad.append(i+2)
            count += 1
            reasons.append("subfamily is a number")
            continue
        if not isinstance(row.Tribu, str) and not (row.Tribu != row.Tribu):
            bad.append(i+2)
            count += 1
            reasons.append("tribu is a number")
            continue
        if not isinstance(row.Genus, str) and not (row.Genus != row.Genus):
            bad.append(i+2)
            count += 1
            reasons.append("genus is a number")
            continue
        if not isinstance(row.Subgenus, str) and not (row.Subgenus != row.Subgenus) :
            bad.append(i+2)
            count += 1
            reasons.append("subgenus is a number")
            continue
        if not isinstance(row.species, str) and not (row.species != row.species) :
            bad.append(i)
            count += 1
            reasons.append("species is a number")
            continue
        if not isinstance(row.Subspecies, str) and not (row.Subspecies != row.Subspecies) :
            bad.append(i+2)
            count += 1
            reasons.append("subspecies is a number")
            continue
        
        if not isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor) :
            bad.append(i+2)
            count += 1
            reasons.append("genus descriptor is a number")
            continue
        
        #Subgenus_Descriptor filter
        if not isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor) :
            bad.append(i+2)
            count += 1
            reasons.append("subgenus descriptor is a number")
            continue
        
        #Species_Descriptor filter
        if not isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor) :
            bad.append(i+2)
            count += 1
            reasons.append("species descriptor is a number")
            continue
                
        #SubSpecies_Descriptor filter
        if not isinstance(row.Subspecies_descriptor, str) and not (row.Subspecies_descriptor != row.Subspecies_descriptor):
            bad.append(i+2)
            count += 1
            reasons.append("subspecies descriptor is a number")
            continue

        if not isinstance(row.Continent, str) and not (row.Continent != row.Continent):
            bad.append(i+2)
            count += 1
            reasons.append("continent is a number")
            continue
        
        if not isinstance(row.Country, str) and not (row.Country != row.Country):
            bad.append(i+2)
            count += 1
            reasons.append("country is a number")
            continue
        if not isinstance(row.Locality, str) and not (row.Locality != row.Locality):
            bad.append(i+2)
            count += 1
            reasons.append("loality is a number")
            continue
        if row.Number<1:
            bad.append(i+2)
            count += 1
            reasons.append("number is lower then one")
            continue
        if not isinstance(row.Sexe, str) and not (row.Sexe != row.Sexe):
            bad.append(i+2)
            count += 1
            reasons.append("sexe is a number")
            continue
        collDate = filter_values(row.Collection_Date)
        if(collDate=="BadEncodingDate"):
            bad.append(i+2)
            count += 1
            reasons.append("date of the collection Descriptor is not well encoded")
            continue
        else :
            row.Collection_Date= collDate
        if not isinstance(row.Ecozone, str) and not (row.Ecozone != row.Ecozone):
            bad.append(i+2)
            count += 1
            reasons.append("ecozone is a number")
            continue
        
        if not isinstance(row.Latitude, str) and not (row.Latitude != row.Latitude):
            bad.append(i+2)
            count += 1
            reasons.append("latitude is a number")
            continue
        
        if not isinstance(row.Longitude, str) and not (row.Longitude != row.Longitude):
            bad.append(i+2)
            count += 1
            reasons.append("longitude is a number")
            continue
        
        if not isinstance(row.SpecimenCode, str) and not (row.SpecimenCode != row.SpecimenCode):
            bad.append(i+2)
            count += 1
            reasons.append("specimecode is a number")
            continue
        genDate = filter_values(row.Genus_Date)
        subgenDate = filter_values(row.Subgenus_Date)
        speDate = filter_values(row.Species_Date)
        subspeDate = filter_values(row.Subspecies_Date)
        if(genDate=="BadEncodingDate"):
            bad.append(i+2)
            count += 1
            reasons.append("date of the genus Descriptor is not a integer")
            continue
        else :
            row.Genus_Date= genDate
        if(subgenDate=="BadEncodingDate"):
            bad.append(i+2)
            count += 1
            reasons.append("date of the subgenus Descriptor is not a integer")
            continue
        else :
            row.Subgenus_Date= subgenDate
        if(speDate=="BadEncodingDate"):
            bad.append(i+2)
            count += 1
            reasons.append("date of the species Descriptor is not a integer")
            continue
        else :
            row.Species_Date= speDate
        if(subspeDate=="BadEncodingDate"):
            bad.append(i+2)
            count += 1
            reasons.append("date of the Subspecies Descriptor is not a integer")
            continue
        else :
            row.Subspecies_Date= subspeDate
    
    
        gooddf.loc[len(gooddf)] = row
    return bad, count, gooddf, reasons


#print(taxonomydf["Specimen code"][0])
#print(locationdf)
