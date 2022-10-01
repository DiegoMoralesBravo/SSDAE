const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const userValidation = async (req, res) => {
    console.log('Validacion de que existe un alumno con este correo');
    //Recoger los parametros por post a guardar
    let data = req.body;
    console.log(data)

    //Leer la base de dato de alumnos
    const student = await prisma.alumnos.findMany({
        where: {
            correo: data.correo,
        },
    })
    console.log('Validacion de que existe un profesor con este correo');

    //Leer la base de dato de profesores
    const profesor = await prisma.profesores.findMany({
        where: {
            correo: data.correo,
        },
    })


    if (student.length) {
        return res.status(200).json({
            mensaje: 'student found',
        })
    } else if (profesor.length) {
        return res.status(200).json({
            mensaje: 'profesor found',
        });
    } else {
        return res.status(200).json({
            mensaje: 'no user with email: ' + data.correo
        });
    }
};


module.exports = {
    userValidation,
}