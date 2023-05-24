
CREATE TABLE "subGenus" (
"id_subgenus" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
"id_sc" INT,
"date" VARCHAR(15), 
PRIMARY KEY ("id_subgenus"),
UNIQUE ("id_subgenus"),
UNIQUE ("name"),
FOREIGN KEY("id_sc") REFERENCES "Scientific"("id_sc")
);

