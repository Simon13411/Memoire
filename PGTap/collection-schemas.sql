CREATE TABLE "Collection" (
"id_collection" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
UNIQUE("id_collection"),
UNIQUE ("name"),
PRIMARY KEY ("id_collection")
);
