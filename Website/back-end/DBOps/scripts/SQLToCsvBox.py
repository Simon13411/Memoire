import pandas as pd
import io
import json
import base64

import psycopg2

#comment the 2 following to show warnings 
import warnings
warnings.filterwarnings('ignore')

conn = psycopg2.connect(
    host="db-entomo",
    database="entomologie",
    user="postgres",
    password="password"
)
cursor = conn.cursor()

selectBox = """SELECT B."id_box", B."location", B."museum", B."paratypes", B."types",O."name" as ordre,
    So."name" as suborder, F."name" as family, Sf."name" as subfamily, T."name" as tribu, G."name" as genus, Sg."name" as subgenus, S."name" as species, Ss."name" as subspecies, Col."name" col,
    G."date" as gendate, Sg."date" as subgendate, S."date" spedate, Ss."date" as subspedate,
    Sgen."name" as scgen, Ssubgen."name" as subgen, Sspe."name" as spe, Ssubspe."name" as subspe

        FROM "Box" B
        LEFT OUTER JOIN "Collection" Col ON B."collection_id"=Col."id_collection"
        LEFT OUTER JOIN "PopuBox" P ON B."id_box"=P."box_id"
        LEFT OUTER JOIN "Population" P2 ON P."population_id"=P2."id_population"
        LEFT OUTER JOIN "Order" O ON P2."order_id"=O."id_order"
        LEFT OUTER JOIN "subOrder" So ON P2."suborder_id"=So."id_suborder"
        LEFT OUTER JOIN "Family" F ON P2."family_id"=F."id_family"
        LEFT OUTER JOIN "subFamily" Sf ON P2."subFamily_id"=Sf."id_subfamily"
        LEFT OUTER JOIN "Tribu" T ON P2."tribu_id"=T."id_tribu"
        LEFT OUTER JOIN "Genus" G ON P2."genus_id"=G."id_genus"
        LEFT OUTER JOIN "subGenus" Sg ON P2."subGenus_id"=Sg."id_subgenus"
        LEFT OUTER JOIN "Species" S ON P2."species_id"=S."id_species"
        LEFT OUTER JOIN "subSpecies" Ss ON P2."subSpecies_id"=Ss."id_subspecies"
        LEFT OUTER JOIN "Scientific" Sgen ON Sgen."id_sc"=G."id_sc" 
        LEFT OUTER JOIN "Scientific" Ssubgen ON Ssubgen."id_sc"=Sg."id_sc" 
        LEFT OUTER JOIN "Scientific" Sspe ON Sspe."id_sc"=S."id_sc" 
        LEFT OUTER JOIN "Scientific" Ssubspe ON Ssubspe."id_sc"=Ss."id_sc" 
        WHERE "id_box" !=0
        ORDER BY B."id_box" """

exe = cursor.execute(selectBox)
count = 1
fetch = cursor.fetchall()

checkCol = ['Num_ID', 'Order', 'Suborder', 'Family', 'Subfamily', 'Tribu', 'Genus', 'Genus_Descriptor', 'Genus_Date', 'Subgenus', 'Subgenus_Descriptor', 'Subgenus_Date', 'species', 'Species_Descriptor', 'Species_Date', 'Subspecies', 'Subspecies_descriptor', 'Subspecies_Date', 'Types', 'Paratypes', 'Museum', 'Box_Localization', 'Collection_Name']
newDf = pd.DataFrame(columns = checkCol)

df = pd.read_sql_query(selectBox, conn)

row = df.loc[0]
        
#On met la premiere boite 
new_row= {'Num_ID':row.id_box, 
              'Order':row.ordre, 
              'Suborder':row.suborder, 
              'Family':row.family, 
              'Subfamily':row.subfamily, 
              'Tribu':row.tribu, 
              'Genus':row.genus, 
              'Genus_Descriptor':row.scgen, 
              'Genus_Date':row.gendate, 
              'Subgenus':row.subgenus,
              'Subgenus_Descriptor':row.subgen, 
              'Subgenus_Date':row.subgendate, 
              'species':row.species, 
              'Species_Descriptor':row.spe, 
              'Species_Date':row.spedate, 
              'Subspecies':row.subspecies, 
              'Subspecies_descriptor':row.subspe, 
              'Subspecies_Date':row.subspedate,
              'Types':row.types, 
              'Paratypes':row.paratypes, 
              'Museum':row.museum, 
              'Box_Localization':row.location, 
              'Collection_Name':row.col}
newDf.loc[len(newDf)] = new_row
for i, row in df.iterrows():
    if(i==0): #si la boit est 0 on met pas c'est que les individus
            pass
    
    #ICI on va devoir concat les differents Ordre, etc
    elif (newDf.loc[len(newDf)-1].Num_ID == row.id_box and i>0 ):
        if (row.ordre != newDf.loc[len(newDf)-1].Order ):
            order = newDf.loc[len(newDf)-1].Order + "_" + row.ordre
        else:
            order = newDf.loc[len(newDf)-1].Order
        if (row.suborder !=newDf.loc[len(newDf)-1].Suborder):
            suborder = newDf.loc[len(newDf)-1].Suborder + "_" + row.suborder
        else:
            suborder = newDf.loc[len(newDf)-1].Suborder
        if (row.family !=newDf.loc[len(newDf)-1].Family):
            family = newDf.loc[len(newDf)-1].Family + "_" + row.family
        else:
            family = newDf.loc[len(newDf)-1].Family
        if (row.subfamily !=newDf.loc[len(newDf)-1].Subfamily):
            subfamily = newDf.loc[len(newDf)-1].Subfamily + "_" + row.subfamily
        else:
            subfamily = newDf.loc[len(newDf)-1].Subfamily
        if (row.tribu !=newDf.loc[len(newDf)-1].Tribu):
            tribu = newDf.loc[len(newDf)-1].Tribu + "_" + row.tribu
        else:
            tribu = newDf.loc[len(newDf)-1].Tribu
        if (row.genus !=newDf.loc[len(newDf)-1].Genus):
            genus = newDf.loc[len(newDf)-1].Genus + "_" + row.genus
        else:
            genus = newDf.loc[len(newDf)-1].Genus
        if (row.subgenus !=newDf.loc[len(newDf)-1].Subgenus):
            subgenus = newDf.loc[len(newDf)-1].Subgenus + "_" + row.subgenus
        else:
            subgenus = newDf.loc[len(newDf)-1].Subgenus
        if (row.species !=newDf.loc[len(newDf)-1].species):
            species = newDf.loc[len(newDf)-1].species + "_" + row.species
        else:
            species = newDf.loc[len(newDf)-1].species
        if (row.subspecies !=newDf.loc[len(newDf)-1].Subspecies):
            subspecies = newDf.loc[len(newDf)-1].Subspecies + "_" + row.subspecies
        else:
            subspecies = newDf.loc[len(newDf)-1].Subspecies
        
        new_row= {'Num_ID':row.id_box, 
              'Order':order, 
              'Suborder':suborder, 
              'Family':family, 
              'Subfamily':subfamily, 
              'Tribu':tribu, 
              'Genus':genus, 
              'Genus_Descriptor':row.scgen, 
              'Genus_Date':row.gendate, 
              'Subgenus':subgenus,
              'Subgenus_Descriptor':row.subgen, 
              'Subgenus_Date':row.subgendate, 
              'species':species, 
              'Species_Descriptor':row.spe, 
              'Species_Date':row.spedate, 
              'Subspecies':subspecies, 
              'Subspecies_descriptor':row.subspe, 
              'Subspecies_Date':row.subspedate,
              'Types':row.types, 
              'Paratypes':row.paratypes, 
              'Museum':row.museum, 
              'Box_Localization':row.location, 
              'Collection_Name':row.col}
        newDf.loc[len(newDf)-1] = new_row
    
    else:
        new_row= {'Num_ID':row.id_box, 
            'Order':row.ordre, 
            'Suborder':row.suborder, 
            'Family':row.family, 
            'Subfamily':row.subfamily, 
            'Tribu':row.tribu, 
            'Genus':row.genus, 
            'Genus_Descriptor':row.scgen, 
            'Genus_Date':row.gendate, 
            'Subgenus':row.subgenus,
            'Subgenus_Descriptor':row.subgen, 
            'Subgenus_Date':row.subgendate, 
            'species':row.species, 
            'Species_Descriptor':row.spe, 
            'Species_Date':row.spedate, 
            'Subspecies':row.subspecies, 
            'Subspecies_descriptor':row.subspe, 
            'Subspecies_Date':row.subspedate,
            'Types':row.types, 
            'Paratypes':row.paratypes, 
            'Museum':row.museum, 
            'Box_Localization':row.location, 
            'Collection_Name':row.col}
        newDf.loc[len(newDf)] = new_row

output = io.BytesIO()
writer = pd.ExcelWriter(output)
newDf.to_excel(writer, index=False)
writer.save()

excel_bytes = output.getvalue()

result = {'filename': 'BoxesData.xlsx', 'content': base64.b64encode(excel_bytes).decode('utf-8')}

result_json = json.dumps(result)
print(result_json)