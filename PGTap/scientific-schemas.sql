CREATE TABLE "Scientific" (
"id_sc" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_sc"),
UNIQUE ("id_sc"),
UNIQUE("name")
);