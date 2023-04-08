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

selectBox = """SELECT I."box_id", I."name" as "SpeciCode", I."continent", I."country", I."ecozone", I."latitude", I."longitude" ,O."name" as ordre,
    So."name" as suborder, F."name" as family, Sf."name" as subfamily, T."name" as tribu, G."name" as genus, Sg."name" as subgenus, S."name" as species, Ss."name" as subspecies, 
    G."date" as gendate, Sg."date" as subgendate, S."date" spedate, Ss."date" as subspedate,
    Sgen."name" as scgen, Ssubgen."name" as subgen, Sspe."name" as spe, Ssubspe."name" as subspe

FROM "Individu" I
LEFT OUTER JOIN "Population" P2 ON I."population_id"=P2."id_population"
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
LEFT OUTER JOIN "Scientific" Ssubspe ON Ssubspe."id_sc"=Ss."id_sc" """

exe = cursor.execute(selectBox)
count = 1
fetch = cursor.fetchall()

checkCol = ["SpecimenCode", "Order", "Suborder", "Tribu", "Family","Subfamily", "Genus", "Subgenus", 
       "species", "Subspecies", "Genus_Descriptor", "Species_Descriptor", "Subgenus_Descriptor", 
       "Subspecies_descriptor", "Genus_Date","Subgenus_Date","Species_Date","Subspecies_Date", "Num_ID","Continent", "Country", "Ecozone","Latitude", "Longitude"]
newDf = pd.DataFrame(columns = checkCol)

df = pd.read_sql_query(selectBox, conn)

row = df.loc[0]
        
for i, row in df.iterrows():
    new_row= {'Num_ID':row.box_id, 
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
              'SpecimenCode':row.SpeciCode,
              'Continent':row.continent,
              'Country':row.country,
              'ecozone': row.ecozone,
              'Latitude':row.latitude,
              'Longitude': row.longitude}
    newDf.loc[len(newDf)] = new_row

output = io.BytesIO()
writer = pd.ExcelWriter(output)
newDf.to_excel(writer, index=False)
writer.save()

excel_bytes = output.getvalue()

result = {'filename': 'IndividualsData.xlsx', 'content': base64.b64encode(excel_bytes).decode('utf-8')}

result_json = json.dumps(result)
print(result_json)