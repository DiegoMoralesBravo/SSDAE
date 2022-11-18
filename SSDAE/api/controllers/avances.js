const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const saveFile = async (req, res) => {

    const extension = req.file.originalname.split('.')[1];

    if (extension == 'zip' || extension == 'rar') {


        user = JSON.parse(req.body.user)
        console.log(user)

        //Insertar los datos en la base
        const tesis = await prisma.tesis.findMany({
            where: {
                id_alumno: user.id_user
            }
        });

        console.log(tesis)

        // data = {
        //     numero_avance: dataBody.correo,
        //     id_tesis: md5(dataBody.correo),
        //     doc: req.file.path
        // }

        // //Insertar los datos en la base
        // const user = await prisma.avances.create({ data });

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