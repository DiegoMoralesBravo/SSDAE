const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDataToHistorial = async (req, res) => {
  const data = req.body;

  try {
    const tesis = await prisma.tesis.findMany({
      where: {
        id_alumno: data.id_user,
      },
    });

    const prof_tesis = await prisma.prof_tesis.findMany({
      where: {
        id_tesis: tesis[0].id_tesis,
      },
      include: {
        profesores: {
          include: {
            usuarios: true,
          },
        },
      },
    });

    const avances = await prisma.avances.findMany({
      where: {
        id_tesis: tesis[0].id_tesis,
      },
      include: {
        evaluacion: true
      }
    });


    let idDirector;

    prof_tesis.forEach((profesor) => {
      if (profesor.rol == "Director") {
        idDirector = profesor.id_profesor;
      }
    });

    const nombreDirector = await prisma.usuarios.findMany({
      where: {
        id_usuario: idDirector,
      },
    });

    console.log(nombreDirector);

    if (tesis.length == 0) {
      return res.status(400).json({
        mensaje: "no hay tesis asignada",
      });
    }

    return res.status(200).json({
      mensaje: "succes",
      tesis,
      prof_tesis,
      nombreDirector: nombreDirector[0],
      avances,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: error.message,
    });
  }
};

const evaluaciones = async (req, res) => {
  console.log(req.body);

  try {
    const evaluacion = await prisma.evaluacion.findMany({
      where: {
        id_tesis: req.body.id_tesis,
        numero_avance: req.body.numero_avance,
        id_avance: req.body.id_avance,
      },
      include: {
        profesores: {
          include: {
            usuarios: true,
          },
        },
      },
    });


    return res.status(200).json({
      mensaje: "ok",
      evaluacion,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: error.message,
    });
  }
};



const getComentarios = async (req, res) => {
  try {
    const comentarios = await prisma.evaluacion.findMany({
      where: {
        id_tesis: req.body.id_tesis,
        numero_avance: req.body.numero_avance,
        id_avance: req.body.id_avance,
        id_profesor: req.body.id_profesor,
      },
    });

    console.log(comentarios)

    return res.status(200).json({
      mensaje: "ok",
      comentarios,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  getDataToHistorial,
  evaluaciones,
  getComentarios,
};
