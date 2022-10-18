const md5 = require('md5');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    console.log('Creacion de usuario');
    //Recoger los parametros por post a guardar

    let data = req.body;
    //Recibo el parametro como string y lo convierto a entero, posiblemente sea por el middleware que estoy usando 
    data.contrasena = md5(data.correo);


    console.log(data)

    //Insertar los datos en la base
    try {
        const insertData = await prisma.usuarios.create({ data });
        return res.status(200).json({
            mensaje: 'User created',
        });

    } catch (err) {
        console.log('HAY UN ERROR')
        console.log(err);
        return res.status(200).json({
            mensaje: err,
        });
    }


};

const validation = async (req, res) => {
    console.log('Validacion de usuario');
    //Recoger los parametros por post a guardar
    let data = req.body;
    data.contrasena = md5(data.contrasena)


    //Leer la base de dato
    const user = await prisma.usuarios.findMany({
        where: {
            correo: data.correo,
            contrasena: data.contrasena
        },
    })

    console.log(user)

    if (user.length) {
        user[0].id_usuario = user[0].id_usuario

        return res.status(200).json({
            mensaje: 'User found',
            user: user[0]
        })
    } else {
        return res.status(200).json({
            mensaje: 'User not found'
        });
    }
};

const fillTable = async (req, res) => {
    console.log('Se obtendran todos los datos')
    const users = await prisma.usuarios.findMany()
    console.log(users)
    return res.status(200).json(
        JSON.stringify(users)
    );
}


module.exports = {
    create,
    validation,
    fillTable,
}