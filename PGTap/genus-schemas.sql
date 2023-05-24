CREATE TABLE "Genus" (
"id_genus" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
"id_sc" INT,
"date" VARCHAR(15), 
PRIMARY KEY ("id_genus"),
UNIQUE ("id_genus"),
UNIQUE ("name"),
FOREIGN KEY("id_sc") REFERENCES "Scientific"("id_sc")
);
