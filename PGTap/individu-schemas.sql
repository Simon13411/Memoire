
CREATE TABLE "Individu" (
"id_individu" VARCHAR(500) NOT NULL,
"box_id" INT NOT NULL,
"population_id" INT NOT NULL,
"continent" VARCHAR(50),
"country" VARCHAR(50), 
"ecozone" VARCHAR(50),
"latitude" VARCHAR(50),
"longitude" VARCHAR(50),
"locality" VARCHAR(50),
"number" INT,
"collection_date" VARCHAR(50),
"sexe" VARCHAR(50),
UNIQUE ("id_individu"),
PRIMARY KEY ("id_individu"),
FOREIGN KEY ("box_id") REFERENCES "Box"("id_box"),
FOREIGN KEY ("population_id") REFERENCES "Population"("id_population")
);