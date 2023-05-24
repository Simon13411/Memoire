# pgtap talk schema, data & tests
#Copyright (c) 2008-2021 David E. Wheeler. Some rights reserved.

#Permission to use, copy, modify, and distribute this software and its documentation for any purpose, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and this paragraph and the following two paragraphs appear in all copies.

#IN NO EVENT SHALL DAVID E. WHEELER BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF DAVID E. WHEELER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#DAVID E. WHEELER SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND DAVID E. WHEELER HAS NO OBLIGATIONS TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

TESTDIR  = t/
PGUSER   = postgres
DATABASE = EntoPGTap
PASSWORD = password

table:
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < order-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < suborder-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < family-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < subfamily-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < tribu-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < scientific-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < genus-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < subgenus-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < species-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < subspecies-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < collection-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < population-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < box-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < popubox-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < individu-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < borrower-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < borrowerIndividu-schemas.sql
	PGPASSWORD=$(PASSWORD) psql -U $(PGUSER) -h 'localhost' -d $(DATABASE) < borrowerBox-schemas.sql

test: $(TESTDIR)/*.sql
		PGPASSWORD=$(PASSWORD) pg_prove -U $(PGUSER) -h 'localhost' -d $(DATABASE) $^ --verbose

overleaf:  $(TESTDIR)/overleaf.sql
		PGPASSWORD=$(PASSWORD) pg_prove -U $(PGUSER) -h 'localhost' -d $(DATABASE) $^ --verbose
