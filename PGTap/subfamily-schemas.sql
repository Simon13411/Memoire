CREATE TABLE "subFamily" (
"id_subfamily" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_subfamily"),
UNIQUE ("id_subfamily"),
UNIQUE ("name")
);