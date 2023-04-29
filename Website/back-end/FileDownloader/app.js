const express = require('express');
const fs = require('fs');
const app = express();

app.get('/individualstemplate', (req, res) => {
    const filePath = 'Files/Individuals.xlsx'; // chemin absolu du fichier
    const fileName = 'Individuals.xlsx'; // nom du fichier à télécharger
    console.log("Recherche du fichier Indivuals.xlsx")
    const fileContent = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    console.log("Fichier Individuals.xlsx trouvé")

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Length', fileSize);

    res.send(fileContent);
    console.log("Fichier Individuals.xlsx envoyé")
});

app.get('/boxestemplate', (req, res) => {
    const filePath = 'Files/Boxes.xlsx'; // chemin absolu du fichier
    const fileName = 'Boxes.xlsx'; // nom du fichier à télécharger
    console.log("Recherche du fichier Boxes.xlsx")
    const fileContent = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    console.log("Fichier Boxes.xlsx trouvé")
  
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Length', fileSize);

    res.send(fileContent);
    console.log("Fichier Boxes.xlsx envoyé")
  });


app.get('/getscriptinstructions', (req, res) => {
    const filePath = 'Files/ScriptsInstructions.pdf'; // chemin absolu du fichier
    const fileName = 'ScriptsInstructions.pdf'; // nom du fichier à télécharger
    console.log("Recherche du fichier ScriptsInstructions.pdf")
    const fileContent = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    console.log("Fichier ScriptsInstructions.pdf trouvé")
  
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', fileSize);

    res.send(fileContent);
    console.log("Fichier ScriptsInstructions.pdf envoyé")
  });

module.exports = app