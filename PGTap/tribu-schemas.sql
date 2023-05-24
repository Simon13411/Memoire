
CREATE TABLE "Tribu" (
"id_tribu" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_tribu"),
UNIQUE ("id_tribu"),
UNIQUE ("name")
);