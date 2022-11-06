const md5 = require('md5');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    console.log('Creacion de usuario');
    //Recoger los parametros por post a guardar

    let dataBody = req.body;
    let data;
    //Recibo el parametro como string y lo convierto a entero, posiblemente sea por el middleware que estoy usando 
    console.log(dataBody)

    data = {
        correo: dataBody.correo,
        contrasena: md5(dataBody.correo),
        tipo_usuario: dataBody.tipo_usuario,
        nombre: dataBody.nombre,
        ap_p: dataBody.ap_p,
        ap_m: dataBody.ap_m
    }

    //Insertar los datos en la base
    const user = await prisma.usuarios.create({ data });

    if (data.tipo_usuario == 'alumno') {
        console.log('Alumno')

        data = {
            id_alumno: user.id_usuario,
            estatus: 'Insertar estatus',
            fecha_ing: new Date(dataBody.fecha_ingreso)
        }

        const insertData = await prisma.alumnos.create({ data });


    }else {
        console.log('Maestro')

        data = {
            id_profesor: user.id_usuario,
            interno_externo: dataBody.interno_externo,
        }

        const insertData = await prisma.profesores.create({ data });

    }

    return res.status(200).json({
        mensaje: 'User created',
    });
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

        if (md5(data.correo) == data.contrasena) {
            console.log('Contrasena igual al correo')
            return res.status(200).json({
                mensaje: 'User found change pass',
                user: user[0]
            })
        } else {
            return res.status(200).json({
                mensaje: 'User found',
                user: user[0]
            })
        }


    } else {
        return res.status(200).json({
            mensaje: 'User not found'
        });
    }
};




const emailValidation = async (req, res) => {
    console.log('Validacion de correo');
    //Recoger los parametros por post a guardar
    let data = req.body;

    //Leer la base de dato
    const user = await prisma.usuarios.findUnique({
        where: {
            correo: data.correo,
        },
    })

    console.log(user)

    if (user) {
        return res.status(200).json({
            mensaje: 'User found',
        })
    } else {
        return res.status(200).json({
            mensaje: 'User not found'
        });
    }
};

const fillTable = async (req, res) => {
    console.log('Se obtendran todos los datos')
    const users = await prisma.usuarios.findMany({
        where: {
            tipo_usuario: { not: "root" },
        },
    })

    console.log(users)
    return res.status(200).json(
        JSON.stringify(users)
    );
}

const deleteUser = async (req, res) => {
    console.log('Se elimina usuario')
    console.log(req.body)

    await prisma.usuarios.delete({
        where: {
            id_usuario: req.body.id,
        },
    })

    return res.status(200).json({
        mensaje: 'User deleted'
    }
    );
}

const editUser = async (req, res) => {
    console.log('Cambio de usuario');
    //Recoger los parametros por post a guardar
    let data = req.body;

    console.log(data)
    console.log(data.id_usuario)

    //Leer la base de dato de alumnos
    const updateUsers = await prisma.usuarios.updateMany({
        where: {
            id_usuario: data.id_usuario,
        },
        data: {
            correo: data.correo,
            nombre: data.nombre,
            ap_p: data.ap_p,
            ap_m: data.ap_m
        },
    })

    console.log(updateUsers)

    return res.status(200).json({
        mensaje: 'Usuario cambiado',
    })
}




module.exports = {
    create,
    validation,
    emailValidation,
    fillTable,
    deleteUser,
    editUser
}