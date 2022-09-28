const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'olin94@ethereal.email',
            pass: 'a4f7Z58DUvArgA2YsU'
        }
});

const mailOptions = {
    from: "Remitente",
    to: "diegomorales1359@gmail.com",
    subject: "Prueba",
    text: "Vaya no se si esto funcionara a la primera"
}


const test = (req, res) => {

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
            res.status(500).send(error.message);
        }
        else {
            console.log('Correo enviado')
            res.status(200).json({
                mensaje: 'CHido',
                info: info
            });
        }
    })
};

module.exports ={
    test
}