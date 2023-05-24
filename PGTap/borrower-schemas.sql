CREATE TABLE "Borrower" (
"id_borrower" INT NOT NULL,
"name" VARCHAR(50) NOT NULL,
"mail" VARCHAR(100),
"phone" VARCHAR(25),
UNIQUE ("id_borrower"),
UNIQUE("name"),
UNIQUE ("mail"),
UNIQUE ("phone"),
PRIMARY KEY ("id_borrower")
);

