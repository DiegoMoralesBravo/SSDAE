const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    html: "<p>HTML version of the message</p>"
};

const resetPass = async (req, res) => {
    console.log(req)
    data = req.body;
    //Leer la base de dato
    const user = await prisma.user.findMany({
        where: {
            user: data.user,
        },
    })

    console.log(user)

    if (user.length) {

        //Se encontro el usuario, generar algun tipo de enlace para cambiar contrasena


        console.log('Se enviara correo')
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
            }
            else {
                console.log('Correo enviado')
                res.status(200).json({
                    mensaje: 'Se encontro usuario',
                    info: info
                });
            }
        })

    } else{
        console.log('Correo no enviado')
        res.status(200).json({
            mensaje: 'No se encontro usuario',
        });
    }


};

module.exports = {
    resetPass
}