# Scripts

- ExecuteFillDb.py is used for .xlsx conversion to SQL. This is the boxes version.
- SQLToCsvBox.py: same but revert
- ExecuteFillIndividu.py is used for .xlsx conversion to SQL. This is the individuals version.
- SQLToCsvIndividu.py: same but revert

## These scripts use other .py files

### Filters
- BoxFilter.py: check if provided .xlsx respect required format. (Boxes version)
- IndividuFilter.py: check if provided .xlsx respect required format. (Individuals version)
- boxexist.py: check if individual's box exist

### Fillers
- box.py: fill box table
- Collection.py: fill collection table
- population.py: fill population table
- name.py: fill order, suborder, family, etc. tables in function of given argument
- namescientist.py: same but with tables that can have a descriptor (scientist)
- scientific.py: fill scientist table

### Information retriever
- getPopulation.py
