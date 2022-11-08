const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saveFile = (req, res) => {
    console.log('Test')

    console.log(req.body)

    return res.status(200).json({
        mensaje: 'Archivo guardado'
    }
    );
}

module.exports = {
    saveFile
}