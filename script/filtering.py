import pandas as pd
import numpy as np

file = pd.ExcelFile("4F0C1500.xlsx")

olddf = pd.read_excel(file)

colname = []
discardedcol = ["ID", "Code_ID", "Name", "Google_sheet_url", "ID_url_Qrcode", 
                "QR_Code", "Region", "Insect_Number", "Box_number", "Expédition Récolteurs",
                "Encoding_Name", "Encoding_Year", "Encoding_Date", "Note", "Genus_species"]
#Box_number = numéro de la boite d'une certaine collection
for col in olddf.columns:
    if col not in discardedcol:
        colname.append(col)
df = olddf[colname].copy()

gooddf = pd.DataFrame(columns = colname)
baddf = pd.DataFrame(columns = colname)

for col in ["Genus_Date", "Subgenus_Date", "Species_Date", "Subspecies_Date"] :
    df[col] = np.nan
    gooddf[col] = np.nan
    baddf[col] = np.nan

#How Many lines are not well encoded ?
count = 0
total = 0
for i, row in df.iterrows() :
    if not isinstance(row.Num_ID,int):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Order, str):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Suborder, str) and not (row.Suborder != row.Suborder):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Family, str) and not (row.Family != row.Family):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Subfamily, str) and not (row.Subfamily != row.Subfamily):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Tribu, str) and not (row.Tribu != row.Tribu):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Genus, str) and not (row.Genus != row.Genus):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if not isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if isinstance(row.Genus_Descriptor, str) and not (row.Genus_Descriptor != row.Genus_Descriptor):
        splittedrow = row.Genus_Descriptor.split()
        if len(splittedrow) == 1 and any(char.isdigit() for char in splittedrow[0]):
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        elif len(splittedrow) > 1:
            flag = False
            for i in range(0, len(splittedrow)) :
                if i != len(splittedrow)-1 and any(char.isdigit() for char in splittedrow[0]):
                    flag = True
                elif i == len(splittedrow)-1 and (any(char.isdigit() for char in splittedrow[0]) and not splittedrow[i].isnumeric()):
                    flag = True
                elif splittedrow[i].isnumeric() :
                    row.Genus_Descriptor = ' '.join(splittedrow[:-1])
                    row.Genus_Date = int(splittedrow[i])
            if flag :
                baddf.loc[len(baddf)] = row
                count += 1
                continue

    #Subgenus_Descriptor filter
    if not isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if isinstance(row.Subgenus_Descriptor, str) and not (row.Subgenus_Descriptor != row.Subgenus_Descriptor):
        splittedrow = row.Subgenus_Descriptor.split()
        if len(splittedrow) == 1 and any(char.isdigit() for char in splittedrow[0]):
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        elif len(splittedrow) > 1:
            flag = False
            for i in range(0, len(splittedrow)) :
                if i != len(splittedrow)-1 and any(char.isdigit() for char in splittedrow[0]):
                    flag = True
                elif i == len(splittedrow)-1 and (any(char.isdigit() for char in splittedrow[0]) and not splittedrow[i].isnumeric()):
                    flag = True
                elif splittedrow[i].isnumeric() :
                    row.Subgenus_Descriptor = ' '.join(splittedrow[:-1])
                    row.Subgenus_Date = int(splittedrow[i])
            if flag :
                baddf.loc[len(baddf)] = row
                count += 1
                continue
    
    #Species_Descriptor filter
    if not isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor):
        baddf.loc[len(baddf)] = row
        count += 1
        continue
    if isinstance(row.Species_Descriptor, str) and not (row.Species_Descriptor != row.Species_Descriptor):
        splittedrow = row.Species_Descriptor.split()
        if len(splittedrow) == 1 and any(char.isdigit() for char in splittedrow[0]):
            baddf.loc[len(baddf)] = row
            count += 1
            continue
        elif len(splittedrow) > 1:
            flag = False
            for i in range(0, len(splittedrow)) :
                if i != len(splittedrow)-1 and any(char.isdigit() for char in splittedrow[0]):
                    flag = True
                elif i == len(splittedrow)-1 and (any(char.isdigit() for char in splittedrow[0]) and not splittedrow[i].isnumeric()):
                    flag = True
                elif splittedrow[i].isnumeric() :
                    row.Species_Descriptor = ' '.join(splittedrow[:-1])
                    row.Species_Date = int(splittedrow[i])
            if flag :
                baddf.loc[len(baddf)] = row
                count += 1
                continue

    gooddf.loc[len(gooddf)] = row

baddf.to_excel("WrongFormatData.xlsx", index=False)
gooddf.to_excel("FilteredData.xlsx",index=False)