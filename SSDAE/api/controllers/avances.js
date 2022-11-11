const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saveFile = (req, res) => {
    console.log('Test')

    console.log(req.file)

    return res.status(200).json({
        mensaje: 'Archivo guardado'
    }
    );
}

module.exports = {
    saveFile
}