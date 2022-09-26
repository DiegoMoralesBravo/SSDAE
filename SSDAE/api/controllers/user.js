const md5 = require('md5');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'Soy una prueba'
    });
};

const create = async (req, res) => {
    //Recoger los parametros por post a guardar
    let data = req.body;
    data.password = md5(data.password)

    //Validar datos


    //Insertar los datos en la base
    const insertData = await prisma.user.create({data});

    return res.status(200).json({
        mensaje: 'User created',
        data,
    });
};

const validation = async (req, res) => {
    //Recoger los parametros por post a guardar
    let data = req.body;
    data.password = md5(data.password)

    //Validar datos
    
    console.log('Validacion');

    //Leer la base de dato
    const user = await prisma.user.findMany({
        where: {
          user: data.user,
          password: data.password
        },
    })
 

    if(user.length){
        return res.status(200).json({
            mensaje: 'Login correcto',
            data,
        })
    }else{
        return res.status(200).json({
            mensaje: 'Login Incorrecto',
        });
    }
};


module.exports ={
    test,
    create,
    validation,
}