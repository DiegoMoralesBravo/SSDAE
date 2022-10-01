const md5 = require('md5');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    console.log('Creacion de alumno');
    //Recoger los parametros por post a guardar
    
    let data = req.body;
    //Recibo el parametro como string y lo convierto a entero, posiblemente sea por el middleware que estoy usando 
    //data.id_alumno = parseInt(data.id_alumno);
    data.contrasena = md5(data.contrasena);
    data.fecha_ing = new Date('1999-01-08');

    console.log(data)

        //Insertar los datos en la base
        try {
            const insertData = await prisma.alumnos.create({data});
        } catch (err){
            console.log('HAY UN ERROR')
            console.log(err);
        }

    return res.status(200).json({
        mensaje: 'User created',
    });
};


module.exports ={
    create
}