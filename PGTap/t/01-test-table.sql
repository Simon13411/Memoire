
BEGIN;
CREATE EXTENSION pgtap;
SELECT plan(1);


SELECT tables_are('public', ARRAY['Order', 'subOrder', 'Family', 'subFamily', 'Tribu', 'Scientific', 'Genus', 'subGenus', 'Species', 'subSpecies', 'Population', 'Collection', 'Box', 'PopuBox', 'Individu', 'Borrower', 'borrowerBox', 'borrowerIndividu']);
SELECT * FROM finish();
ROLLBACK;
