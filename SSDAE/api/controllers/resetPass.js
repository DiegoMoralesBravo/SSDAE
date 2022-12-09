const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const md5 = require("md5");
const nodemailer = require("nodemailer");

const userValidation = async (req, res) => {
  console.log("Validacion de que existe un usuario con este correo");
  //Recoger los parametros por post a guardar
  let data = req.body;
  console.log(data);

  try {
    const user = await prisma.usuarios.findMany({
      where: {
        correo: data.correo,
      },
    });

    if (user.length) {
      let token = md5(Math.random().toString());

      let currentTime = new Date().getTime();
      let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000);
      console.log(user.id_usuario);

      data = {
        correo: data.correo,
        token,
        fecha_expiracion: updatedTIme,
      };

      let url =
        "http://localhost:5173/resetpass?key=" +
        token +
        "&correo=" +
        data.correo;

      //Insertar los datos en la base para cambio de password
      try {
        await prisma.recuperaciones.create({ data });
      } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
      }

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "diego.morales2887@alumnos.udg.mx",
          pass: "sada",
        },
      });

      const mailOptions = {
        from: "diego.morales2887@alumnos.udg.mx",
        to: data.correo,
        subject: "Recuperacion contrasena",
        text: "Plaintext version of the message",
        html:
          "<p>Link para reset de contrasena, solo se cuenta con 1 hora para el cambio: </p> <a href=" +
          url +
          ">Cambiar contrasena</a>",
      };

      console.log("Se enviara correo");
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send(error.message);
        } else {
          console.log("Correo enviado");
        }
      });

      return res.status(200).json({
        mensaje: "user found",
        correo: url,
      });
    } else {
      console.log("No existe usuario");
      return res.status(200).json({
        mensaje: "no user with email: " + data.correo,
      });
    }
  } catch (error) {
    return res.status(400).send(err.message);
  }
};

const tokenValidation = async (req, res) => {
  console.log("Validacion de que existe el token con correo");
  //Recoger los parametros por post a guardar
  let data = req.body;

  try {
    const user = await prisma.recuperaciones.findMany({
      where: {
        token: data.token,
        correo: data.correo,
      },
    });

    //Falta comprobacion de la fecha de expiracion del token
    if (user.length) {
      return res.status(200).json({
        mensaje: "user found",
      });
    } else {
      return res.status(200).json({
        mensaje: "no valid user",
      });
    }
  } catch (error) {}
  return res.status(400).json({
    mensaje: "Error en revisar token",
  });
};

const passChange = async (req, res) => {
  console.log("Cambio de contrasena");
  //Recoger los parametros por post a guardar
  let data = req.body;
  data.password = md5(data.password);

  try {
    //Leer la base de dato de alumnos
    const updateUsers = await prisma.usuarios.updateMany({
      where: {
        correo: data.email,
      },
      data: {
        contrasena: data.password,
      },
    });

    return res.status(200).json({
      mensaje: "Contrasena cambiada",
    });
  } catch (error) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  userValidation,
  tokenValidation,
  passChange,
};
