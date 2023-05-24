
BEGIN;
CREATE EXTENSION pgtap;
SELECT plan(109);

SELECT columns_are('Order', ARRAY['id_order', 'name']);
SELECT has_column('Order', 'id_order');
SELECT col_is_pk('Order', 'id_order');
SELECT col_not_null('Order', 'id_order');
SELECT col_type_is('Order', 'id_order', 'integer');
SELECT has_column('Order', 'name');
SELECT col_type_is('Order', 'name', 'character varying(100)');
SELECT col_not_null('Order', 'name');
SELECT col_is_unique('Order', 'name');

SELECT columns_are('subOrder', ARRAY['id_suborder', 'name']);
SELECT has_column('subOrder', 'id_suborder');
SELECT col_is_pk('subOrder', 'id_suborder');
SELECT col_not_null('subOrder', 'id_suborder');
SELECT col_type_is('subOrder', 'id_suborder', 'integer');
SELECT has_column('subOrder', 'name');
SELECT col_type_is('subOrder', 'name', 'character varying(100)');
SELECT col_not_null('subOrder', 'name');
SELECT col_is_unique('subOrder', 'name');

SELECT columns_are('Tribu', ARRAY['id_tribu', 'name']);
SELECT has_column('Tribu', 'id_tribu');
SELECT col_is_pk('Tribu', 'id_tribu');
SELECT col_not_null('Tribu', 'id_tribu');
SELECT col_type_is('Tribu', 'id_tribu', 'integer');
SELECT has_column('Tribu', 'name');
SELECT col_type_is('Tribu', 'name', 'character varying(100)');
SELECT col_not_null('Tribu', 'name');
SELECT col_is_unique('Tribu', 'name');

SELECT columns_are('Family', ARRAY['id_family', 'name']);
SELECT has_column('Family', 'id_family');
SELECT col_is_pk('Family', 'id_family');
SELECT col_not_null('Family', 'id_family');
SELECT col_type_is('Family', 'id_family', 'integer');
SELECT has_column('Family', 'name');
SELECT col_type_is('Family', 'name', 'character varying(100)');
SELECT col_not_null('Family', 'name');
SELECT col_is_unique('Family', 'name');

SELECT columns_are('subFamily', ARRAY['id_subfamily', 'name']);
SELECT has_column('subFamily', 'id_subfamily');
SELECT col_is_pk('subFamily', 'id_subfamily');
SELECT col_not_null('subFamily', 'id_subfamily');
SELECT col_type_is('subFamily', 'id_subfamily', 'integer');
SELECT has_column('subFamily', 'name');
SELECT col_type_is('subFamily', 'name', 'character varying(100)');
SELECT col_not_null('subFamily', 'name');
SELECT col_is_unique('subFamily', 'name');

SELECT columns_are('Genus', ARRAY['id_genus', 'name', 'id_sc', 'date']);
SELECT has_column('Genus', 'id_genus');
SELECT col_is_pk('Genus', 'id_genus');
SELECT col_not_null('Genus', 'id_genus');
SELECT col_type_is('Genus', 'id_genus', 'integer');
SELECT has_column('Genus', 'name');
SELECT col_type_is('Genus', 'name', 'character varying(100)');
SELECT col_not_null('Genus', 'name');
SELECT has_fk('Genus');
SELECT col_is_fk('Genus', 'id_sc');
SELECT fk_ok('Genus', 'id_sc', 'Scientific', 'id_sc');
SELECT col_is_null('Genus', 'id_sc');
SELECT col_is_null('Genus', 'date');
SELECT col_type_is('Genus', 'id_sc', 'integer');
SELECT col_type_is('Genus', 'date', 'character varying(15)');
SELECT col_is_unique('Genus', 'name');

SELECT columns_are('subGenus', ARRAY['id_subgenus', 'name', 'id_sc', 'date']);
SELECT has_column('subGenus', 'id_subgenus');
SELECT col_is_pk('subGenus', 'id_subgenus');
SELECT col_not_null('subGenus', 'id_subgenus');
SELECT col_type_is('subGenus', 'id_subgenus', 'integer');
SELECT has_column('subGenus', 'name');
SELECT col_type_is('subGenus', 'name', 'character varying(100)');
SELECT col_not_null('subGenus', 'name');
SELECT has_fk('subGenus');
SELECT col_is_fk('subGenus', 'id_sc');
SELECT fk_ok('subGenus', 'id_sc', 'Scientific', 'id_sc');
SELECT col_is_null('subGenus', 'id_sc');
SELECT col_is_null('subGenus', 'date');
SELECT col_type_is('subGenus', 'id_sc', 'integer');
SELECT col_type_is('subGenus', 'date', 'character varying(15)');
SELECT col_is_unique('subGenus', 'name');

SELECT columns_are('Species', ARRAY['id_species', 'name', 'id_sc', 'date']);
SELECT has_column('Species', 'id_species');
SELECT col_is_pk('Species', 'id_species');
SELECT col_not_null('Species', 'id_species');
SELECT col_type_is('Species', 'id_species', 'integer');
SELECT has_column('Species', 'name');
SELECT col_type_is('Species', 'name', 'character varying(100)');
SELECT col_not_null('Species', 'name');
SELECT has_fk('Species');
SELECT col_is_fk('Species', 'id_sc');
SELECT fk_ok('Species', 'id_sc', 'Scientific', 'id_sc');
SELECT col_is_null('Species', 'id_sc');
SELECT col_is_null('Species', 'date');
SELECT col_type_is('Species', 'id_sc', 'integer');
SELECT col_type_is('Species', 'date', 'character varying(15)');
SELECT col_is_unique('Species', 'name');

SELECT columns_are('subSpecies', ARRAY['id_subspecies', 'name', 'id_sc', 'date']);
SELECT has_column('subSpecies', 'id_subspecies');
SELECT col_is_pk('subSpecies', 'id_subspecies');
SELECT col_not_null('subSpecies', 'id_subspecies');
SELECT col_type_is('subSpecies', 'id_subspecies', 'integer');
SELECT has_column('subSpecies', 'name');
SELECT col_type_is('subSpecies', 'name', 'character varying(100)');
SELECT col_not_null('subSpecies', 'name');
SELECT has_fk('subSpecies');
SELECT col_is_fk('subSpecies', 'id_sc');
SELECT fk_ok('subSpecies', 'id_sc', 'Scientific', 'id_sc');
SELECT col_is_null('subSpecies', 'id_sc');
SELECT col_is_null('subSpecies', 'date');
SELECT col_type_is('subSpecies', 'id_sc', 'integer');
SELECT col_type_is('subSpecies', 'date', 'character varying(15)');
SELECT col_is_unique('subSpecies', 'name');



SELECT * FROM finish();
ROLLBACK;
