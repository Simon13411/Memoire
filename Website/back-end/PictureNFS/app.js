const express = require('express');
const fs = require('fs');
const app = express();

app.get('/getpicture/:type/:id', (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const Path = `usr/picturenfs/share/${type}`; // chemin absolu du fichier
    const fileName = `${id}.bmp`; // nom du fichier à télécharger
    console.log(`Recherche de la photo ${id} dans le dossier ${type}`)
    const fileContent = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    console.log(`Fichier ${filename} trouvé`)

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'image/bmp');
    res.setHeader('Content-Length', fileSize);

    res.send(fileContent);
    console.log(`Fichier ${fileName} envoyé`)
});

module.exports = app
