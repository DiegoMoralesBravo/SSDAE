const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');


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
            avance: avances,

        })

    } else {
        return res.status(200).json({
            mensaje: 'No hay tesis asignada'
        })
    }
}

const saveFile = async (req, res) => {

    const extension = req.file.originalname.split('.')[1];
    console.log(extension)

    if (extension == 'zip' || extension == 'rar') {

        data = {
            numero_avance: parseInt(req.body.numeroAvance),
            id_tesis: parseInt(req.body.idTesis),
            doc: req.file.filename,
            revisado: 'sin revisar'
        }

        console.log(data)

        // //Insertar los datos en la base
        const avances = await prisma.avances.create({ data });

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



const changeFile = async (req, res) => {
    console.log(req.body)

    // const extension = req.file.originalname.split('.')[1];

    // if (extension == 'zip' || extension == 'rar') {

    //     // let user = JSON.parse(req.body.user)

    //     console.log(req.body)

    //     // //Insertar los datos en la base
    //     // const tesis = await prisma.tesis.findMany({
    //     //     where: {
    //     //         id_alumno: user.id_user
    //     //     }
    //     // });

    // } else {

    //     fs.unlink(req.file.path, e => {
    //         return res.status(400).json({
    //             mensaje: 'Archivo no guardado'
    //         }
    //         );
    //     });

    // }



    return res.status(200).json({
        mensaje: 'prueba'
    })
}

module.exports = {
    saveFile,
    checkTesis,
    changeFile

}