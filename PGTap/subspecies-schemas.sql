CREATE TABLE "subSpecies" (
"id_subspecies" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
"id_sc" INT,
"date" VARCHAR(15), 
PRIMARY KEY ("id_subspecies"),
UNIQUE ("id_subspecies"),
UNIQUE ("name"),
FOREIGN KEY("id_sc") REFERENCES "Scientific"("id_sc")
);
