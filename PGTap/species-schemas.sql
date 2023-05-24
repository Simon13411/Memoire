CREATE TABLE "Species" (
"id_species" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
"id_sc" INT,
"date" VARCHAR(15), 
PRIMARY KEY ("id_species"),
UNIQUE ("id_species"),
UNIQUE ("name"),
FOREIGN KEY("id_sc") REFERENCES "Scientific"("id_sc")
);