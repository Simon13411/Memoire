CREATE TABLE "subOrder" (
"id_suborder" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_suborder"),
UNIQUE ("id_suborder"),
UNIQUE ("name")
);