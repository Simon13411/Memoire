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
            return None
        else:
            return "BadEncodingDate"
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
            return [],1,pd.DataFrame, ["Wrong column names"]
        else:
            colname.append(col)
    for col in checkCol:
        if col not in colname:

            return [],1,pd.DataFrame, ["Wrong column names"]

    df = olddf[colname].copy()
    #print(colname)
    gooddf = pd.DataFrame(columns = colname)



    #How Many lines are not well encoded ?
    reasons = []
    bad = []
    """
    StringValue is a function that will check wether or not the cell of the excel is a string or not
    
    :param: name = name of the specific cell (eg: row.Column)
    :param: error = string error of the column name
    :return: True if there is an error
     """
    def StringValue(name, error):
        if not isinstance(name, str) and not (name != name) :
            bad.append(i+2)
            reasons.append(error +" is a number")
            return True
        else:
            return False
    """
    MandatoryValue is a function that will check wether or not the mandatory cell of the excel have certain value
    
    :param: name = name of the specific cell (eg: row.Column)
    :param: error = string error of the column name
    :return: True if there is an error
     """ 
    def MandatoryString(name, error):
        if not isinstance(name, str):
            if math.isnan(name):
                bad.append(i+2)
                reasons.append("There is no " + error)
                return True
            else:
                return False
    """
    IntValue is a function that will check wether or not the cell of the excel is a int or not
    
    :param: name = name of the specific cell (eg: row.Column)
    :param: error = string error of the column name
    :return: True if there is an error
     """
    def IntValue(name, error):
        if isinstance(name, str) and not (name != name):
            if not any(char.isdigit() for char in name):
                bad.append(i+2)
                reasons.append(error + " is not a number")
                return True
            else:
                return False

    for i, row in df.iterrows() :
        if not float(row.Num_ID).is_integer() or math.isnan(row.Num_ID):
            bad.append(i+2)
            reasons.append("Box id")
            continue
        if (isinstance(row.Order, str)): order = row.Order.split("_")
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
            reasons.append("several order and several sub classification")
            continue
        if(len(suborder)>1 and (len(family)>1 or len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several suborder and several sub classification")
            continue
        if(len(family)>1 and( len(subfamily)>1 or len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several family and several sub classification")
            continue
        if( len(subfamily)>1 and( len(tribu)>1 or len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several subfamily and several sub classification")
            continue
        if( len(tribu)>1 and( len(genus)>1 or len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several rtibu and several sub classification")
            continue
        if(len(genus)>1 and( len(subgenus)>1 or len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several genus and several sub classification")
            continue
        if(len(subgenus)>1 and( len(species)>1 or len(subspecies)>1)):
            bad.append(i+2)
            reasons.append("several subgenus and several sub classification")
            continue
        if(len(species)>1 and len(subspecies)>1):
            bad.append(i+2)
            reasons.append("several species and several sub classification")
            continue

        if(MandatoryString(row.Order, "order")):
            continue
        
        if(StringValue(row.Order, "Order")):
            continue
        if(StringValue(row.Suborder, "SubOrder")):
            continue
        if(StringValue(row.Family, "Family")):
            continue
        if(StringValue(row.Subfamily, "SubFamily")):
            continue
        if(StringValue(row.Tribu, "Tribu")):
            continue
        if(StringValue(row.Genus, "Genus")):
            continue
        if(StringValue(row.Subgenus, "SubGenus")):
            continue
        if(StringValue(row.species, "species")):
            continue
        if(StringValue(row.Subspecies, "SubSpecies")):
            continue
        if(StringValue(row.Genus_Descriptor, "genus descriptor")):
            continue
        if(StringValue(row.Subgenus_Descriptor, "subgenus descriptor")):
            continue
        if(StringValue(row.Species_Descriptor, "species descriptor")):
            continue
        if(StringValue(row.Subspecies_descriptor, "subspecies descriptor")):
            continue
        
        if(StringValue(row.Museum, "museum")):
            continue
        if(StringValue(row.Box_Localization, "box localization")):
            continue
        if(StringValue(row.Collection_Name, "collection")):
            continue
        if(StringValue(row.Subgenus_Descriptor, "subgenus descriptor")):
            continue
        if(MandatoryString(row.Collection_Name, "collection")):
            continue
        if(IntValue(row.Paratypes, "paratypes")):
            continue
        if(IntValue(row.Types, "types")):
            continue

        if(filter_values(row.Genus_Date)=="BadEncodingDate"):
            bad.append(i+2)
            reasons.append("date of the genus Descriptor is not a integer")
            continue
        else :
            row.Genus_Date= filter_values(row.Genus_Date)
        if(filter_values(row.Subgenus_Date)=="BadEncodingDate"):
            bad.append(i+2)
            reasons.append("date of the subgenus Descriptor is not a integer")
            continue
        else :
            row.Subgenus_Date= filter_values(row.Subgenus_Date)
        if(filter_values(row.Species_Date)=="BadEncodingDate"):
            bad.append(i+2)
            reasons.append("date of the species Descriptor is not a integer")
            continue
        else :
            row.Species_Date= filter_values(row.Species_Date)
        if(filter_values(row.Subspecies_Date)=="BadEncodingDate"):
            bad.append(i+2)
            reasons.append("date of the Subspecies Descriptor is not a integer")
            continue
        else :
            row.Subspecies_Date= filter_values(row.Subspecies_Date)

        gooddf.loc[len(gooddf)] = row
    return bad, len(bad), gooddf, reasons
