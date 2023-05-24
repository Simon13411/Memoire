# Memoire - Entomological museum WebApp

This project is the product of the work of Jean Schot and Simon Grognard. It was realized in the framework of a master thesis at the UCLouvain under the supervision of Axel Legay and the help of our client, Grégoire Noël, entomologist of the Gembloux faculty (ULiège), and his colleagues.

**Any use outside the faculty of Gembloux or UCLouvain requires our prior consultation.**

Several READMEs are available in the different folders so that they speak more specifically about a folder and not about the whole project.

## Description
During the course of this work, the first step was to develop the design of the database and the application.

For the design of the database, ER diagrams with crow's foot notation were used, passing through the conceptual, logical and physical stages.
For the design of the application, we went through a step of taking information about the needs of the users and then moving on to the step of obtaining a general rendering of the application. We also had to design the architecture of the application. Using microservices, it was necessary to analyze which were the various containers necessary to obtain a good division of these in order to have the best possible portability and isolation as well as a good flexibility.

At the implementation level, we had to create the SQL tables as well as the python scripts allowing to fill them on the basis of excel files. It was also necessary, as previously mentioned, to create a user interface, for which the React framework was used for the front-end and javascript for the back-end. The operational development was managed under Docker.

Several different tests were carried out to ensure the completeness and efficiency of the solution provided. Firstly, the pgTap unit framework was used to check the relevance of the data before and after additions, deletions and data updates.
The security was tested at the level of SQL injections thanks to SQLmap, an automated tool allowing to test the parameters of http requests.
Finally, a user test was set up to ensure that the needs of entomologists were managed by the application.

## Where are the different parts of the project located?
- CreateTables folder: CREATE TABLE SQL commands for the two database
- Driagramme folder: .drawio file of the physical diagram of entomological database (editable)
- PGTap folder: PGTap testing
- Website folder: all the implementation part (scripts, Front-end, Back-end, scripts instructions, etc...)
- xlsx folder: .xlsx examples files for current fill-scripts
- MasterThesis.pdf: Design and Testing part but also every other information mentioned in description
