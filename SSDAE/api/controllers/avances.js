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

    if (extension == 'zip' || extension == 'rar') {
        data = {
            numero_avance: parseInt(req.body.numeroAvance),
            id_tesis: parseInt(req.body.idTesis),
            doc: req.file.filename,
            revisado: 'sin revisar'
        }

        // //Insertar los datos en la base
        const avances = await prisma.avances.create({ data });

        return res.status(200).json({
            mensaje: 'Archivo guardado',
            avances
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
    const extension = req.file.originalname.split('.')[1];
    if (extension == 'zip' || extension == 'rar') {
        const updateDoc = await prisma.avances.updateMany({
            where: {
                doc: req.body.oldName,
            },
            data: {
                doc: req.file.filename,
            },
        })


        fs.unlink('../app/public/avances/' + req.body.oldName, e => {
            console.log('Se elimino')
        });

        return res.status(200).json({
            mensaje: 'Archivo guardado',
            docName: req.file.filename
        })

    } else {

        fs.unlink(req.file.path, e => {
            return res.status(400).json({
                mensaje: 'Archivo no guardado'
            }
            );
        });

    }


}

const avancesControl = async(req, res) => {

    let arrayPanel = [];


    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
    
        return false;
    }

    const alumnos = await prisma.alumnos.findMany()
    console.log(alumnos)

    if(alumnos.length == 0){
        return res.status(200).json({
            mensaje: 'No hay alumnos',
            arrayPanel
        });
    }


    alumnos.forEach(alumno =>{

        let obj= {ano: alumno.ano_ingreso, ciclo: alumno.ciclo};

        if(containsObject(obj,arrayPanel)){
            console.log('Si esta')
        }else{
            console.log('No esta')
            arrayPanel.push(obj);

        }

    })

    arrayPanel.sort(function (a, b) {
        if (a.ano > b.ano) {
          return 1;
        }
        if (a.ano < b.ano) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    console.log(arrayPanel)

    return res.status(200).json({
        mensaje: 'Ok',
        arrayPanel
    });

}

module.exports = {
    saveFile,
    checkTesis,
    changeFile,
    avancesControl

}