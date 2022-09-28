const nodemailer = require('nodemailer');


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