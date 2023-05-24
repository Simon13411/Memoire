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

    bad = []
    reasons = []
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
    """
    SeveralPopu is a function that will check that an individual has no more then one identification
    
    :param: name = name of the specific cell (eg: row.Column)
    :param: error = string error of the column name
    :return: True if there is an error
     """
    def SeveralPopu(name, error):
        if (isinstance(name, str)): nameList = name.split("_")
        else: nameList = [""]
        if(len(nameList)>1):
            bad.append(i+2)
            reasons.append("several " + error + " for an individual")
            return True
        else: 
            return False

    for i, row in df.iterrows() :
        if math.isnan(row.Num_ID): #obliger d'avoir une box_id = 0 si individu pas dans uen boite
            bad.append(i+2)
            reasons.append("There is no box mentioned")
            continue
        if(MandatoryString(row.SpecimenCode, "specimen code")):
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
        
        if(SeveralPopu(row.Order, "order")):
            continue
        if(SeveralPopu(row.Suborder, "SubOrder")):
            continue
        if(SeveralPopu(row.Family, "Family")):
            continue
        if(SeveralPopu(row.Subfamily, "SubFamily")):
            continue
        if(SeveralPopu(row.Tribu, "Tribu")):
            continue
        if(SeveralPopu(row.Genus, "Genus")):
            continue
        if(SeveralPopu(row.Subgenus, "SubGenus")):
            continue
        if(SeveralPopu(row.species, "species")):
            continue
        if(SeveralPopu(row.Subspecies, "SubSpecies")):
            continue
        
        if(StringValue(row.Genus_Descriptor, "genus descriptor")):
            continue
        if(StringValue(row.Subgenus_Descriptor, "subgenus descriptor")):
            continue
        if(StringValue(row.Species_Descriptor, "species descriptor")):
            continue
        if(StringValue(row.Subspecies_descriptor, "subspecies descriptor")):
            continue
        if(StringValue(row.Continent, "continent")):
            continue
        if(StringValue(row.Country, "country")):
            continue
        if(StringValue(row.Locality, "locality")):
            continue
        if(StringValue(row.Sexe, "sexe")):
            continue
        if(StringValue(row.Ecozone, "ecozone")):
            continue
        if(StringValue(row.Latitude, "latitude")):
            continue
        if(StringValue(row.Longitude, "longitude")):
            continue
        if(StringValue(row.SpecimenCode, "specimen code")):
            continue
        if row.Number<1:
            bad.append(i+2)
            reasons.append("number is lower then one")
            continue
        if(filter_values(row.Collection_Date)=="BadEncodingDate"):
            bad.append(i+2)
            reasons.append("date of the collection Descriptor is not well encoded")
            continue
        else :
            row.Collection_Date= filter_values(row.Collection_Date)
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


#print(taxonomydf["Specimen code"][0])
#print(locationdf)
