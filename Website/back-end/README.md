# Back-end

## APIGateway
Gateway between front-end and back-end microservoces
- app.js send appropriate requests when receiving request

## Database
A simple postgresql:latest nodejs container

## DBOps
Operation on museum database
- app.js launch appropriate function when receiveing requests
- db_ops.js is the file where these functions are
- scripts folder contains scripts used to convert SQL database to .xlsx and .xslx to SQL database. A README is available in the folder.

## FileDownloader
- Files folder contains files for user downloading
- app.js handle the requests by searching and sending appropriate file.
- *Could be improved in 1 function with appropriate parameters in request*

## PictureNFS
Retrieve picture stored in a NAS with NFS connexion
- app.js handle the requests by searching and sending appropriate picture


### You can find more information in our master thesis.