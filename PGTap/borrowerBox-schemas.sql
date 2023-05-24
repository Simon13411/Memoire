CREATE TABLE "borrowerBox" (
"borrower_id" INT NOT NULL,
"box_id" INT NOT NULL,
UNIQUE("borrower_id"),
PRIMARY KEY("borrower_id","box_id"),
FOREIGN KEY ("borrower_id") REFERENCES "Borrower"("id_borrower"),
FOREIGN KEY ("box_id") REFERENCES "Box"("id_box") ON DELETE CASCADE,
CONSTRAINT "UC_borrowerBox" UNIQUE ("borrower_id","box_id")
);
