const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const md5 = require('md5');
const nodemailer = require('nodemailer');


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

    if (student.length || profesor.length) {
        let token = md5(Math.random().toString());
        let email = data.correo;
        let url = 'http://localhost:5173/resetpass?key=' + token + '&email=' + email;

        let currentTime = new Date().getTime();
        let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000);

        data = {
            email,
            token,
            fecha_expiracion: updatedTIme
        }

        //Insertar los datos en la base para cambio de password
        try {
            console.log(data)
            await prisma.recuperaciones.create({ data });
        } catch (err) {
            console.log('HAY UN ERROR')
            console.log(err);
        }

        var transporter = nodemailer.createTransport({
            name: 'diego',
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "30825ea6c0b648",
                pass: "1508fed290558c"
            }
        });


        const mailOptions = {
            from: "sender@server.com",
            to: "diegomorales1359@gmail.com",
            subject: "Message title",
            text: "Plaintext version of the message",
            html: "<p>Link para reset de contrasena, solo se cuenta con 1 hora para el cambio: </p> <a href=" + url + ">Cambiar contrasena</a>"
        };


        console.log('Se enviara correo')
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
            }
            else {
                console.log('Correo enviado')
            }
        })

    }

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

const tokenValidation = async (req, res) => {
    console.log('Validacion de que existe el token con correo');
    //Recoger los parametros por post a guardar
    let data = req.body;
    console.log(data.email)

    //Leer la base de dato de alumnos
    const user = await prisma.recuperaciones.findMany({
        where: {
            email: data.email,
            token: data.token
        },
    })

    //Falta comprobacion de la fecha de expiracion del token

    if (user.length) {
        return res.status(200).json({
            mensaje: 'user found',
        })
    } else {
        return res.status(200).json({
            mensaje: 'no valid user'
        });
    }
}

const passChange = async (req, res) => {
    console.log('Cambio de contrasena');
    //Recoger los parametros por post a guardar
    let data = req.body;

    data.password = md5(data.password)
    console.log(data)

    //Leer la base de dato de alumnos
    const updateUsers = await prisma.alumnos.updateMany({
        where: {
            correo: data.email,
        },
        data: {
            contrasena: data.password,
        },
    })
    return res.status(200).json({
        mensaje: 'Contrasena cambiada',
    })
}


module.exports = {
    userValidation,
    tokenValidation,
    passChange
}