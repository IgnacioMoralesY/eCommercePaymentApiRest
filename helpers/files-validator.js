const path = require('path');
const { v4: uuidv4 } = require('uuid');

const saveFile = ({ filecsv }, extendValids = ['csv'], dir = '') => {

    return new Promise((resolve, reject) => {
        if(!filecsv.name.includes('.')){
            return reject('El archivo debe tener extension valida');
        }
    
        const arrNameFileSplit = filecsv.name.split('.');
        const ext = arrNameFileSplit[arrNameFileSplit.length - 1];
    
        if(!extendValids.includes(ext.toLowerCase())){
            return reject('El archivo debe tener extension .csv');
        }
    
        const temporalName = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../files/', dir, temporalName);
    
        filecsv.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            
            resolve(uploadPath);
        });
    });

    
}

module.exports = {
    saveFile
}