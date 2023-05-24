
CREATE TABLE "Box" (
"id_box" INT NOT NULL,
"collection_id" INT, 
"location" VARCHAR(50),
"museum" VARCHAR(50),
"paratypes" INT, 
"types" INT, 
UNIQUE("id_box"),
PRIMARY KEY ("id_box")
);
