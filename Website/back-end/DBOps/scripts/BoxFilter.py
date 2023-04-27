import pandas as pd
import numpy as np
import math


"""
filter_values filter the value to convert a float to a integer if possible.
if not possible:    -return None (if it is a float)
                    -return val (if it is a string)

:param: either a float, integer or a string
:return: the int(value), None, val
"""
def filter_values(val):
    if isinstance(val, float):
        if val.is_integer():
            return int(val)
        elif math.isnan(val):
            return val
        else:
            return None
    else:
        return val

"""
filterExcel filter the excel to check wether or not there is bad row encoded

:param: a pandas dataframe of the excel
:return:    -bad = list of the bad index in the excel
            -count = number of bad row encoded
            -gooddf = a good pandas dataframe
            -reason = reasons of the different bad encoding
"""
def filterExcel(olddf):

    checkCol = ['Num_ID', 'Order', 'Suborder', 'Family', 'Subfamily', 'Tribu', 'Genus', 'Genus_Descriptor', 'Genus_Date', 'Subgenus', 'Subgenus_Descriptor', 'Subgenus_Date', 'species', 'Species_Descriptor', 'Species_Date', 'Subspecies', 'Subspecies_descriptor', 'Subspecies_Date', 'Types', 'Paratypes', 'Museum', 'Box_Localization', 'Collection_Name']
    colname = []
    for col in olddf.columns:
        if col not in checkCol:
            return [],1,pd.DataFrame, ["pas les bonnes colonnes"]
        else:
            colname.append(col)
    for col in checkCol:
        if col not in colname:
            
            return [],1,pd.DataFrame, ["pas les bonnes colonnes"]

    df = olddf[colname].copy()
    #print(colname)
    gooddf = pd.DataFrame(columns = colname)
    baddf = pd.DataFrame(columns = colname)



    #How Many lines are not well encoded ?
    count = 0
    total = 0
    reasons = []
    bad = []
    for i, row in df.iterrows() :
        if not float(row.Num_ID).is_integer() or math.isnan(row.Num_ID):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("Box id")
            continue
        if (isinstance(row.Suborder, str)):
            order = row.Order.split("_")
        else: order=[""]
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
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several order and several sub classification")
            continue
        if(len(suborder)>1 and (len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several suborder and several sub classification")
            continue
        if(len(family)>1 and( len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several family and several sub classification")
            continue
        if( len(subfamily)>1 and( len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several subfamily and several sub classification")
            continue
        if( len(tribu)>1 and( len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several rtibu and several sub classification")
            continue
        if(len(genus)>1 and( len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several genus and several sub classification")
            continue
        if(len(subgenus)>1 and( len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several subgenus and several sub classification")
            continue
        if(len(species)>1 and len(subspecies)>1):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            reasons.append("several species and several sub classification")
            continue
        
        if not isinstance(row.Order, str)  or math.isnan(row.Num_ID):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("pas d'ordre")
            continue
        if not isinstance(row.Suborder, str) and not (row.Suborder != row.Suborder) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("suborder is a number")
            continue
        if not isinstance(row.Family, str) and not (row.Family != row.Family) :
            count += 1
            baddf.loc[len(baddf)] = row
            bad.append(i+2)
            reasons.append("family is a number")
            continue
        if not isinstance(row.Subfamily, str) and not (row.Subfamily != row.Subfamily):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("subfamily is a number")
            continue
        if not isinstance(row.Tribu, str) and not (row.Tribu != row.Tribu):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("tribu is a number")
            continue
        if not isinstance(row.Genus, str) and not (row.Genus != row.Genus):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("genus is a number")
            continue
        if not isinstance(row.Subgenus, str) and not (row.Subgenus != row.Subgenus) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("subgenus is a number")
            continue
        if not isinstance(row.species, str) and not (row.species != row.species) :
            bad.append(i)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("species is a number")
            continue
        if not isinstance(row.Subspecies, str) and not (row.Subspecies != row.Subspecies) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("subspecies is a number")
            continue
        
        if not isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("genus descriptor is a number")
            continue
        
        #Subgenus_Descriptor filter
        if not isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("subgenus descriptor is a number")
            continue
        
        #Species_Descriptor filter
        if not isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("species descriptor is a number")
            continue
                
        #SubSpecies_Descriptor filter
        if not isinstance(row.Subspecies_descriptor, str) and not (row.Subspecies_descriptor != row.Subspecies_descriptor):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("subspecies descriptor is a number")
            continue

        
        
        if not isinstance(row.Museum, str) and not (row.Museum != row.Museum):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("museum is a number")
            continue
        
        if not isinstance(row.Box_Localization, str) and not (row.Box_Localization != row.Box_Localization):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("box localization is a number")
            continue
        
        if not isinstance(row.Collection_Name, str) and not (row.Collection_Name != row.Collection_Name):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("collection is a number")
            continue
        if isinstance(row.Types, str) and not (row.Types != row.Types):
            if not any(char.isdigit() for char in row.Types):

                bad.append(i+2)
                baddf.loc[len(baddf)] = row
                count += 1
                reasons.append("type is not a number")
                continue
        if isinstance(row.Paratypes, str) and not (row.Paratypes != row.Paratypes):
            if not any(char.isdigit() for char in row.Paratypes):

                bad.append(i+2)
                baddf.loc[len(baddf)] = row
                count += 1
                reasons.append("paratype is not a number")
                continue
        genDate = filter_values(row.Genus_Date)
        subgenDate = filter_values(row.Subgenus_Date)
        speDate = filter_values(row.Species_Date)
        subspeDate = filter_values(row.Subspecies_Date)
        if(genDate==None):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("date of the genus Descriptor is not a integer")
            continue
        else :
            row.Genus_Date= genDate
        if(subgenDate==None):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("date of the subgenus Descriptor is not a integer")
            continue
        else :
            row.Subgenus_Date= subgenDate
        if(speDate==None):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("date of the species Descriptor is not a integer")
            continue
        else :
            row.Species_Date= speDate
        if(subspeDate==None):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            reasons.append("date of the Subspecies Descriptor is not a integer")
            continue
        else :
            row.Subspecies_Date= subspeDate
        
    
    
        gooddf.loc[len(gooddf)] = row
    #baddf.to_excel("WrongFormatData5-4.xlsx", index=False)
    #gooddf.to_excel("GoodFormat.xlsx", index=False)
    return bad, count, gooddf, reasons
        

            



