const express = require('express');
const fs = require('fs');
const app = express();

app.get('/getpicture', (req, res) => {
    console.log("Received request")
    const type = req.query.type
    const id = req.query.id
    const fileName = `${id}.bmp`; // nom du fichier à télécharger
    const filePath = `share/${type}/${fileName}`; // chemin absolu du fichier
    console.log(`Recherche de la photo ${id} dans le dossier ${type}`)
    const fileContent = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    console.log(`Fichier ${fileName} trouvé`)

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'image/bmp');
    res.setHeader('Content-Length', fileSize);

    res.send(fileContent);
    console.log(`Fichier ${fileName} envoyé`)
});

module.exports = app
