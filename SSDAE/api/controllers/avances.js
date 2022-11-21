const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const saveFile = async (req, res) => {  

    const extension = req.file.originalname.split('.')[1];

    if (extension == 'zip' || extension == 'rar') {

        console.log(req.body)
        let user = JSON.parse(req.body.user)
    
        //Insertar los datos en la base
        const tesis = await prisma.tesis.findMany({
            where: {
                id_alumno: user.id_user
            }
        });


        data = {
            numero_avance: parseInt(req.body.numeroAvance),
            id_tesis: tesis[0].id_tesis,
            doc: req.file.path,
            revisado: 'sin revisar'
        }

        console.log(data)

        //Insertar los datos en la base
        const avances = await prisma.avances.create({ data });

        console.log(avances)

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

const checkTesis = async (req, res) => {

    const tesis = await prisma.tesis.findMany({
        where: {
            id_alumno: req.body.id_user
        }
    });


    if (tesis.length > 0) {

        const avances = await prisma.avances.findMany({
            where: {
                id_tesis: tesis[0].id_tesis
            }
        });

        return res.status(200).json({
            mensaje: 'Si hay tesis',
            tesis: tesis,
            avance: avances
        })
    } else {
        return res.status(200).json({
            mensaje: 'No hay tesis asignada'
        })
    }
}

module.exports = {
    saveFile,
    checkTesis,

}