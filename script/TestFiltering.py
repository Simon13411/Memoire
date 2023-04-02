import pandas as pd
import numpy as np
import math



def filterExcel(file):

    olddf = pd.read_excel(file)


    checkCol = ['Num_ID', 'Order', 'Suborder', 'Family', 'Subfamily', 'Tribu', 'Genus', 'Genus_Descriptor', 'Genus_range', 'Genus_Date', 'Subgenus', 'Subgenus_Descriptor', 'Subgenus_Date', 'species', 'Species_Descriptor', 'Species_range', 'Species_Date', 'Subspecies', 'Subspecies_descriptor', 'Subspecies_Date', 'Types', 'Paratypes', 'Museum', 'Box_Localization', 'Collection_Name']
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
    baddf = pd.DataFrame(columns = colname)



    #How Many lines are not well encoded ?
    count = 0
    total = 0
    string  = ""
    bad = []
    for i, row in df.iterrows() :
        if not float(row.Num_ID).is_integer() or math.isnan(row.Num_ID):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
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
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if(len(suborder)>1 and (len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if(len(family)>1 and( len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if( len(subfamily)>1 and( len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if( len(tribu)>1 and( len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if(len(genus)>1 and( len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if(len(subgenus)>1 and( len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        if(len(species)>1 and len(subspecies)>1):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count+=1
            continue
        
        if not isinstance(row.Order, str)  or math.isnan(row.Num_ID):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Suborder, str) and not (row.Suborder != row.Suborder) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Family, str) and not (row.Family != row.Family) :
            count += 1
            baddf.loc[len(baddf)] = row
            bad.append(i+2)
            continue
        if not isinstance(row.Subfamily, str) and not (row.Subfamily != row.Subfamily):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Tribu, str) and not (row.Tribu != row.Tribu):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Genus, str) and not (row.Genus != row.Genus):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Subgenus, str) and not (row.Subgenus != row.Subgenus) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.species, str) and not (row.species != row.species) :
            bad.append(i)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        if not isinstance(row.Subspecies, str) and not (row.Subspecies != row.Subspecies) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        if not isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        #Subgenus_Descriptor filter
        if not isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        #Species_Descriptor filter
        if not isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
                
        #SubSpecies_Descriptor filter
        if not isinstance(row.Subspecies_descriptor, str) and not (row.Subspecies_descriptor != row.Subspecies_descriptor):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        if not isinstance(row.Genus_range, str) and not (row.Genus_range != row.Genus_range) :
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        if not isinstance(row.Species_range, str) and not (row.Species_range != row.Species_range):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        
        if not isinstance(row.Museum, str) and not (row.Museum != row.Museum):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        if not isinstance(row.Box_Localization, str) and not (row.Box_Localization != row.Box_Localization):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        
        if not isinstance(row.Collection_Name, str) and not (row.Collection_Name != row.Collection_Name):
            bad.append(i+2)
            baddf.loc[len(baddf)] = row
            count += 1
            continue
    
    
        gooddf.loc[len(gooddf)] = row
    return bad, count, gooddf, ""
        

            

#baddf.to_excel("WrongFormatData.xlsx", index=False)

