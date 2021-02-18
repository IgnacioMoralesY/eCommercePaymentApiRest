const { response } = require('express');
const { saveFile } = require('../helpers/files-validator');


const add = async(req, res = response) => {
    if (!req.files || !req.files.filecsv || Object.keys(req.files).length === 0) {
        res.status(400).json({
            msg: 'No se encontraron archivospara guardar'
        });
        return;
    }

    await saveFile(req.files);
    
    return res.json({
        msg: 'Archivo subido exitosamente!'
    });
    
}

module.exports = {
    add
}