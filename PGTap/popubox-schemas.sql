
CREATE TABLE "PopuBox" (
"population_id" INT NOT NULL,
"box_id" INT NOT NULL,
PRIMARY KEY("population_id", "box_id"),
FOREIGN KEY ("population_id") REFERENCES "Population"("id_population"),
FOREIGN KEY ("box_id") REFERENCES "Box"("id_box") ON DELETE CASCADE,
CONSTRAINT "UC_PopuBox" UNIQUE ("population_id", "box_id")
);