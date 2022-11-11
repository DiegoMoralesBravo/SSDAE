const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const saveFile = (req, res) => {

    const extension = req.file.originalname.split('.')[1];

    if (extension == 'zip' || extension == 'rar') {
        return res.status(200).json({
            mensaje: 'Archivo guardado'
        }
        );
    }
    else {
        fs.unlink(req.file.path, e => {
            return res.status(400).json({
                mensaje: 'Archivo no guardado'
            }
            );
        });
    }
}

module.exports = {
    saveFile
}