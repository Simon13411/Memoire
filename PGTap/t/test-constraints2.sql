
BEGIN;
CREATE EXTENSION pgtap;
SELECT plan(125);

SELECT columns_are('Scientific', ARRAY['id_sc', 'name']);
SELECT has_column('Scientific', 'id_sc');
SELECT col_is_pk('Scientific', 'id_sc');
SELECT col_not_null('Scientific', 'id_sc');
SELECT col_type_is('Scientific', 'id_sc', 'integer');
SELECT has_column('Scientific', 'name');
SELECT col_type_is('Scientific', 'name', 'character varying(100)');
SELECT col_not_null('Scientific', 'name');
SELECT col_is_unique('Scientific', 'name');

SELECT columns_are('Population', ARRAY['id_population', 'order_id', 'suborder_id', 'tribu_id', 'family_id', 'subFamily_id', 'genus_id', 'subGenus_id', 'species_id', 'subSpecies_id' ]);

SELECT col_is_pk('Population', 'id_population');
SELECT col_not_null('Population', 'id_population');
SELECT col_not_null('Population', 'order_id');
SELECT col_type_is('Population', 'id_population', 'integer');
SELECT col_type_is('Population', 'order_id', 'integer');
SELECT col_type_is('Population', 'suborder_id', 'integer');
SELECT col_type_is('Population', 'tribu_id', 'integer');
SELECT col_type_is('Population', 'family_id', 'integer');
SELECT col_type_is('Population', 'subFamily_id', 'integer');
SELECT col_type_is('Population', 'genus_id', 'integer');
SELECT col_type_is('Population', 'subGenus_id', 'integer');
SELECT col_type_is('Population', 'species_id', 'integer');
SELECT col_type_is('Population', 'subSpecies_id', 'integer');
SELECT col_is_null('Population', 'suborder_id');
SELECT col_is_null('Population', 'tribu_id');
SELECT col_is_null('Population', 'family_id');
SELECT col_is_null('Population', 'subFamily_id');
SELECT col_is_null('Population', 'genus_id');
SELECT col_is_null('Population', 'subGenus_id');
SELECT col_is_null('Population', 'species_id');
SELECT col_is_null('Population', 'subSpecies_id');


SELECT fk_ok('Population', 'order_id', 'Order', 'id_order');
SELECT fk_ok('Population', 'suborder_id', 'subOrder', 'id_suborder');
SELECT fk_ok('Population', 'family_id', 'Family', 'id_family');
SELECT fk_ok('Population', 'subFamily_id', 'subFamily', 'id_subfamily');
SELECT fk_ok('Population', 'tribu_id', 'Tribu', 'id_tribu');
SELECT fk_ok('Population', 'genus_id', 'Genus', 'id_genus');
SELECT fk_ok('Population', 'subGenus_id', 'subGenus', 'id_subgenus');
SELECT fk_ok('Population', 'species_id', 'Species', 'id_species');
SELECT fk_ok('Population', 'subSpecies_id', 'subSpecies', 'id_subspecies');

SELECT columns_are('Collection', ARRAY['id_collection', 'name']);
SELECT has_column('Collection', 'id_collection');
SELECT col_is_pk('Collection', 'id_collection');
SELECT col_not_null('Collection', 'id_collection');
SELECT col_type_is('Collection', 'id_collection', 'integer');
SELECT has_column('Collection', 'name');
SELECT col_type_is('Collection', 'name', 'character varying(100)');
SELECT col_not_null('Collection', 'name');
SELECT col_is_unique('Collection', 'name');

SELECT columns_are('Box', ARRAY['id_box', 'collection_id', 'location', 'museum', 'paratypes', 'types']);
SELECT col_is_pk('Box', 'id_box');
SELECT col_not_null('Box', 'id_box');
SELECT col_type_is('Box', 'id_box', 'integer');
SELECT col_type_is('Box', 'collection_id', 'integer');
SELECT col_type_is('Box', 'location', 'character varying(50)');
SELECT col_type_is('Box', 'museum', 'character varying(50)');
SELECT col_type_is('Box', 'paratypes', 'integer');
SELECT col_type_is('Box', 'types', 'integer');
SELECT col_is_null('Box', 'collection_id');
SELECT col_is_null('Box', 'location');
SELECT col_is_null('Box', 'museum');
SELECT col_is_null('Box', 'paratypes');
SELECT col_is_null('Box', 'types');

SELECT columns_are('PopuBox', ARRAY['population_id', 'box_id']);
SELECT col_is_pk('PopuBox', ARRAY['population_id','box_id']);
SELECT col_not_null('PopuBox', 'population_id');
SELECT col_not_null('PopuBox', 'box_id');
SELECT col_type_is('PopuBox', 'box_id', 'integer');
SELECT col_type_is('PopuBox', 'population_id', 'integer');
SELECT fk_ok('PopuBox', 'population_id', 'Population', 'id_population');
SELECT fk_ok('PopuBox', 'box_id', 'Box', 'id_box');

SELECT columns_are('Individu', ARRAY['id_individu', 'box_id', 'population_id', 'continent', 'country', 'ecozone', 'latitude', 'longitude' ,'locality', 'number', 'collection_date', 'sexe']);
SELECT col_is_pk('Individu', 'id_individu');
SELECT col_not_null('Individu', 'id_individu');
SELECT col_not_null('Individu', 'box_id');
SELECT col_not_null('Individu', 'population_id');

SELECT col_type_is('Individu', 'id_individu', 'character varying(500)');
SELECT col_type_is('Individu', 'box_id', 'integer');
SELECT col_type_is('Individu', 'population_id', 'integer');
SELECT col_type_is('Individu', 'number', 'integer');
SELECT col_type_is('Individu', 'continent', 'character varying(50)');
SELECT col_type_is('Individu', 'country', 'character varying(50)');
SELECT col_type_is('Individu', 'ecozone', 'character varying(50)');
SELECT col_type_is('Individu', 'latitude', 'character varying(50)');
SELECT col_type_is('Individu', 'longitude', 'character varying(50)');
SELECT col_type_is('Individu', 'sexe', 'character varying(50)');
SELECT col_type_is('Individu', 'collection_date', 'character varying(50)');
SELECT col_is_null('Individu', 'continent');
SELECT col_is_null('Individu', 'country');
SELECT col_is_null('Individu', 'ecozone');
SELECT col_is_null('Individu', 'latitude');
SELECT col_is_null('Individu', 'longitude');
SELECT col_is_null('Individu', 'number');
SELECT col_is_null('Individu', 'collection_date');
SELECT col_is_null('Individu', 'sexe');
SELECT fk_ok('Individu', 'population_id', 'Population', 'id_population');
SELECT fk_ok('Individu', 'box_id', 'Box', 'id_box');

SELECT columns_are('Borrower', ARRAY['id_borrower', 'name', 'mail', 'phone']);
SELECT col_is_pk('Borrower', 'id_borrower');
SELECT col_not_null('Borrower', 'id_borrower');
SELECT col_not_null('Borrower', 'name');

SELECT col_type_is('Borrower', 'id_borrower', 'integer');
SELECT col_type_is('Borrower', 'name', 'character varying(50)');
SELECT col_type_is('Borrower', 'mail', 'character varying(100)');
SELECT col_is_null('Borrower', 'mail');
SELECT col_is_null('Borrower', 'phone');
SELECT col_is_unique('Borrower','name');
SELECT col_is_unique('Borrower','mail');
SELECT col_is_unique('Borrower','phone');

SELECT columns_are('borrowerBox', ARRAY['borrower_id', 'box_id']);
SELECT col_is_pk('borrowerBox', ARRAY['borrower_id','box_id']);
SELECT col_not_null('borrowerBox', 'borrower_id');
SELECT col_not_null('borrowerBox', 'box_id');
SELECT col_type_is('borrowerBox', 'box_id', 'integer');
SELECT col_type_is('borrowerBox', 'borrower_id', 'integer');
SELECT fk_ok('borrowerBox', 'borrower_id', 'Borrower', 'id_borrower');
SELECT fk_ok('borrowerBox', 'box_id', 'Box', 'id_box');

SELECT columns_are('borrowerIndividu', ARRAY['borrower_id', 'individu_id']);
SELECT col_is_pk('borrowerIndividu', ARRAY['borrower_id','individu_id']);
SELECT col_not_null('borrowerIndividu', 'borrower_id');
SELECT col_not_null('borrowerIndividu', 'individu_id');
SELECT col_type_is('borrowerIndividu', 'individu_id', 'character varying(500)');
SELECT col_type_is('borrowerIndividu', 'borrower_id', 'integer');
SELECT fk_ok('borrowerIndividu', 'borrower_id', 'Borrower', 'id_borrower');
SELECT fk_ok('borrowerIndividu', 'individu_id', 'Individu', 'id_individu');


SELECT * FROM finish();
ROLLBACK;
