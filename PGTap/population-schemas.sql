CREATE TABLE "Population" (
"id_population" INT NOT NULL,
"order_id" INT NOT NULL,
"suborder_id" INT,
"tribu_id" INT NULL,
"family_id" INT,
"subFamily_id" INT,
"genus_id" INT,
"subGenus_id" INT,
"species_id" INT, 
"subSpecies_id" INT,
PRIMARY KEY ("id_population"),
UNIQUE ("id_population"),
FOREIGN KEY("order_id") REFERENCES "Order"("id_order"),
FOREIGN KEY("suborder_id") REFERENCES "subOrder"("id_suborder"),
FOREIGN KEY("family_id") REFERENCES "Family"("id_family"),
FOREIGN KEY("subFamily_id") REFERENCES "subFamily"("id_subfamily"),
FOREIGN KEY("genus_id") REFERENCES "Genus"("id_genus"),
FOREIGN KEY("subGenus_id") REFERENCES "subGenus"("id_subgenus"),
FOREIGN KEY("species_id") REFERENCES "Species"("id_species"),
FOREIGN KEY("subSpecies_id") REFERENCES "subSpecies"("id_subspecies"),
FOREIGN KEY("tribu_id") REFERENCES "Tribu"("id_tribu")

);
