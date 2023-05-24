CREATE TABLE "Order" (
"id_order" INT NOT NULL,
"name" VARCHAR(100) NOT NULL,
PRIMARY KEY ("id_order"),
UNIQUE ("id_order"),
UNIQUE ("name")
);
