const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const save = async (req, res) => {
  console.log("Nueva evaluacion de tesis");

  let dataPost = req.body;
  console.log(dataPost);

  let data = {
    numero_avance: dataPost.numero_avance,
    id_tesis: dataPost.id_tesis,
    campo1: parseInt(dataPost.campo1),
    campo2: parseInt(dataPost.campo2),
    campo3: parseInt(dataPost.campo3),
    campo4: parseInt(dataPost.campo4),
    campo5: parseInt(dataPost.campo5),
    campo6: parseInt(dataPost.campo6),
    campo7: parseInt(dataPost.campo7),
  };

  if (req.hasOwnProperty("file")) {
    //Formatos aceptados:
    const extension = req.file.originalname.split(".")[1];

    if (
      extension == "jpg" ||
      extension == "png" ||
      extension == "jpeg" ||
      extension == "pdf" ||
      extension == "doc" ||
      extension == "txt"
    ) {
      try {
        // const insertData= await prisma.evaluacion.create({ data });
        return res.status(200).json({
          mensaje: "Evaluación guardada",
        });
      } catch (err) {
        console.log(err);
        return res.status(200).json({
          mensaje: err,
        });
      }
    } else {
      fs.unlink(req.file.path, (e) => {
        return res.status(400).json({
          mensaje: "Formatos aceptados: jpg, png, pdf, doc y txt",
        });
      });
    }
  } else {
    console.log("No tiene archivo");

    try {
      // const insertData= await prisma.evaluacion.create({ data });
      return res.status(200).json({
        mensaje: "Evaluación guardada",
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        mensaje: err,
      });
    }
  }
};

const check = (req, res) => {

  
  return res.status(200).json({
    mensaje: "test",
  });
}

module.exports = {
  save,
  check
};
