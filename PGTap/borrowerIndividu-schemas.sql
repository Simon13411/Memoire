
CREATE TABLE "borrowerIndividu" (
"borrower_id" INT NOT NULL,
"individu_id" VARCHAR(500) NOT NULL,
UNIQUE("borrower_id"),
PRIMARY KEY("borrower_id","individu_id"),
FOREIGN KEY ("borrower_id") REFERENCES "Borrower"("id_borrower"),
FOREIGN KEY ("individu_id") REFERENCES "Individu"("id_individu") ON DELETE CASCADE,
CONSTRAINT "UC_borrowerIndividu" UNIQUE ("borrower_id","individu_id")
);
