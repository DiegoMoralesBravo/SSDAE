const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {

    console.log('Creacion de tesis');
    //Recoger los parametros por post a guardar

    let dataPost = req.body;
    console.log(dataPost)

    

    let data = {
        tema: dataPost.tema,
        descripcion: dataPost.descripcion,   
        id_alumno: 1,
    }


    //Insertar los datos en la base
    try {
        const insertData = await prisma.tesis.create({ data });
        return res.status(200).json({
            mensaje: 'Tesis created',
        });

    } catch (err) {
        console.log(err);
        return res.status(200).json({
            mensaje: err,
        });
    }



}

const fillTable = async (req, res) => {
    console.log('Se obtendran todos los datos')
    const tesis = await prisma.tesis.findMany();

    console.log(tesis)
    return res.status(200).json(
        JSON.stringify(tesis)
    );
}

const deleteTesis = async (req, res) => {
    console.log('Se elimina usuario')
    console.log(req.body)
    
    await prisma.tesis.delete({
        where: {
            id_tesis: req.body.id,
        },
    })

    return res.status(200).json({
        mensaje: 'Tesis deleted'
    }
    );
}

const asignStudent = async (req, res) => {
    console.log('Se asignara estudiante')
    data = req.body;
    console.log(data)
    const updateStudent = await prisma.tesis.update({
        where: {
            id_tesis: data.id_tesis,
        },
        data: {
            id_alumno: data.id_alumno
        },
    })
    console.log(updateStudent)
    return res.status(200).json({
        mensaje: 'Student asigned'
    }
    );
}

const asignStudentName = async (req, res) => {
    data = req.body;
    console.log(data)

    const user = await prisma.usuario.findUnique({
        where: {
          id_usuario: data.id_usuario,
        },
        select: {
          nombre: true,
          ap_p: true,
          ap_m: true,
        },
      })

    return res.status(200).json({
        mensaje: 'Student consult',
        user: user,
    }
    );
}


module.exports = {
    create,
    fillTable,
    deleteTesis,
    asignStudent,
    asignStudentName,

}