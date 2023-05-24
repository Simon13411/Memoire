
CREATE TABLE "Family" (
"id_family" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_family"),
UNIQUE ("id_family"),
UNIQUE ("name")
);