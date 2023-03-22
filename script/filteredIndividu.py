import pandas as pd
import numpy as np
import math

file = pd.ExcelFile("Collection_individu.xlsm")

olddf = pd.read_excel(file)

xls = pd.ExcelFile(file)
codedf = pd.read_excel(xls, 'Code')
locationdf = pd.read_excel(xls, 'Location')
dnadf = pd.read_excel(xls, 'DNA')
ecologydf = pd.read_excel(xls, 'Ecology')
taxonomydf = pd.read_excel(xls, 'Taxonomy')
countstoragedf = pd.read_excel(xls, 'Counts_Storage')
acquisitiondf = pd.read_excel(xls, 'Acquisition')


#dans location besoin de specimen code, continent, country 
#prendre quand même exact site
#ajouter ecozone

#dans taxonomy besoin de specimen code, order, family, genus, species, subspecies
#ajouter subOrder, subFamily, Tribu, SubGenus
col = ["Specimen code", "Continent", "Country", "Ecozone", "Order", "Suborder", "Tribu", "Family","Subfamily", "Genus", "Subgenus", 
       "species", "Subspecies", "Num_ID", "Author", "Date", "Genus_Descriptor", "Species_Descriptor", "Subgenus_Descriptor", 
       "Subspecies_descriptor", "Genus_Date","Subgenus_Date","Species_Date","Subspecies_Date","Box_Localization","Museum","Paratypes", 
       "Types", "Genus_range", "Species_range"]
individudf = pd.DataFrame(columns = col)
print(codedf)
for i,row in taxonomydf.iterrows():
    if(locationdf["Specimen code"][i] != taxonomydf["Specimen code"][i] and codedf["Specimen code"][i] != taxonomydf["Specimen code"][i]):
        print("PAS BIEN")
        break
    else:
        speciCode = locationdf["Specimen code"][i]
        if isinstance(locationdf["Continent"][i], float): continent=" "
        if isinstance(locationdf["Country"][i], float): country=" "
        ecozone = " "
        order = taxonomydf["Order"][i]
        suborder = ""
        tribu = ""
        family = taxonomydf["Family"][i]
        subfamily = ""
        genus =  taxonomydf["Genus"][i]
        subgenus = ""
        species = taxonomydf["Species"][i]
        subspecies = taxonomydf["Subspecies"][i]
        boxID = codedf["Box_Num_ID"][i]
        if math.isnan(boxID) : boxID = 0
        Genus_descriptor = ""
        Species_Descriptor =""
        Subgenus_Descriptor =""
        Subspecies_descriptor =""
        Genus_Date=0
        Subgenus_Date=0	
        Species_Date=0
        Subspecies_Date=0
        Box_Localization=""
        Museum =""
        Paratypes=0
        Types=0 
        Genus_range=""
        Species_range=""

        authDate = taxonomydf["Author and year"][i]
        if not isinstance(authDate,str): 
            
        
            authDate = ""
        else: 
            authDate = authDate.replace("(","").replace(")","").split(",")
        if (len(authDate)==2):
            author = authDate[0]
            date =  int(authDate[1])
            #print("author: ", author, " date: ", date)
        else:
            author = ""
            date=""
        
        new_row = {"Specimen code": speciCode,
                   "Continent": continent,
                   "Country": country, 
                   "Ecozone": ecozone, 
                   "Order": order, 
                   "Suborder": suborder, 
                   "Tribu": tribu, 
                   "Family": family,
                   "Subfamily": subfamily, 
                   "Genus": genus, 
                   "Subgenus": subgenus, 
                   "species": species, 
                   "Subspecies": subspecies,
                   "Num_ID": boxID,
                   "Author": author,
                   "Date": date,
                   "Genus_Descriptor" :Genus_descriptor, 
                   "Species_Descriptor":Species_Descriptor, 
                   "Subgenus_Descriptor":Subgenus_Descriptor, 
                   "Subspecies_descriptor":Subspecies_descriptor,
                   "Genus_Date":Genus_Date,
                   "Subgenus_Date":Subgenus_Date,	
                   "Species_Date":Species_Date,	
                   "Subspecies_Date":Subspecies_Date,
                   "Box_Localization":Box_Localization,
                   "Museum":Museum,
                   "Paratypes":Paratypes, 
                   "Types":Types, 
                   "Genus_range":Genus_range, 
                   "Species_range":Species_range}
        individudf.loc[len(individudf)] = new_row
individudf.to_excel("IndividuFiltered.xlsx", index = False)     
print(individudf)


#print(taxonomydf["Specimen code"][0])
#print(locationdf)
