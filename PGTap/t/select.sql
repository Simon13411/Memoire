-- pg_prove -U postgres -d kittycats 06-select.sql --verbose
-- psql -U postgres -1f 06-selects.sql kittycats

BEGIN;
CREATE EXTENSION pgtap;
SELECT plan(16);

SELECT lives_ok(
  'INSERT INTO
    "Order" ("id_order", "name")
  VALUES
    (5000, $$OrderPGTAP$$);'
);

SELECT throws_ok(
  'INSERT INTO
    "Order" ("id_order", "name")
  VALUES
    (5000, $$OrderPGTAP2$$);',
  'duplicate key value violates unique constraint "Order_pkey"'
);

SELECT lives_ok(
  'INSERT INTO
    "Genus" ("id_genus", "name", "id_sc", "date")
  VALUES
    (5000, $$GenusPGTAP$$, NULL, NULL);'
);

SELECT throws_ok(
  'INSERT INTO
    "Genus" ("id_genus", "name", "id_sc", "date")
  VALUES
    (5000, $$GenusPGTAP2$$, 1, $$date$$);',
  'duplicate key value violates unique constraint "Genus_pkey"'
);


SELECT lives_ok(
  'INSERT INTO
    "Scientific" ("id_sc", "name")
  VALUES
    (5000, $$ScientificPGTAP$$);'
);

SELECT throws_ok(
  'INSERT INTO
    "Scientific" ("id_sc", "name")
  VALUES
    (5000, $$ScientificPGTAP2$$);',
  'duplicate key value violates unique constraint "Scientific_pkey"'
);

SELECT lives_ok(
  'INSERT INTO
    "Collection" ("id_collection", "name")
  VALUES
    (5000, $$CollectionPGTAP$$);'
);

SELECT throws_ok(
  'INSERT INTO
    "Collection" ("id_collection", "name")
  VALUES
    (5000, $$CollectionPGTAP2$$);',
  'duplicate key value violates unique constraint "Collection_pkey"'
);

SELECT lives_ok(
  'INSERT INTO
    "Box" ("id_box", "collection_id", "location", "museum", "paratypes", "types")
  VALUES
    (5000, NULL, NULL, NULL, NULL, NULL);'
);

SELECT throws_ok(
  'INSERT INTO
    "Box" ("id_box", "collection_id", "location", "museum", "paratypes", "types")
  VALUES
    (5000, NULL, NULL, NULL, NULL, NULL);',
  'duplicate key value violates unique constraint "Box_pkey"'
);


SELECT lives_ok(
  'INSERT INTO
    "Population" ("id_population", "order_id", "suborder_id", "family_id", "subFamily_id", "tribu_id", "genus_id", "subGenus_id", "species_id", "subSpecies_id")
  VALUES
    (5000, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);'
);

SELECT throws_ok(
  'INSERT INTO
    "Population" ("id_population", "order_id", "suborder_id", "family_id", "subFamily_id", "tribu_id", "genus_id", "subGenus_id", "species_id", "subSpecies_id")
  VALUES
    (5000, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);',
  'duplicate key value violates unique constraint "Population_pkey"'
);



SELECT lives_ok(
  'INSERT INTO
    "PopuBox" ("population_id", "box_id")
  VALUES
    (5000, 5000);'
);

SELECT throws_ok(
  'INSERT INTO
    "PopuBox" ("population_id", "box_id")
  VALUES
    (5000, 5000);',
  'duplicate key value violates unique constraint "UC_PopuBox"'
);


SELECT lives_ok(
  'INSERT INTO
    "Individu" ("id_individu", "box_id", "population_id", "continent", "country", "ecozone", "latitude", "longitude", "locality", "number", "collection_date", "sexe")
  VALUES
    ($$5000$$, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);'
);

SELECT throws_ok(
  'INSERT INTO
    "Individu" ("id_individu", "box_id", "population_id", "continent", "country", "ecozone", "latitude", "longitude", "locality", "number", "collection_date", "sexe")
  VALUES
    ($$5000$$, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);',
  'duplicate key value violates unique constraint "Individu_pkey"'
);

SELECT * FROM finish();
ROLLBACK;
