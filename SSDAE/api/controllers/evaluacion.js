const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const save = async (req, res) => {
  console.log("Nueva evaluacion de tesis");

  const dataPost = req.body;
  const dataCampos = JSON.parse(dataPost.data)
  const user = JSON.parse(dataPost.user)
  const avance = JSON.parse(dataPost.avance)

  console.log(dataCampos)
  // console.log(user)
  // console.log(avance)

  let data = {
    id_profesor: user.id_user,
    id_avance: avance.id_avance,
    numero_avance: avance.numero_avance,
    id_tesis: avance.id_tesis,
    campo1: parseInt(dataCampos.campo1),
    campo2: 2,
    campo3: 2,
    campo4: 2,
    campo5: 2,
    campo6: 2,
    campo7: 2,
    doc: 'sin doc'
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

      data.doc = req.file.filename

      try {
        const evaluacion = await prisma.evaluacion.create({ data });

        return res.status(200).json({
          mensaje: "Evaluación guardada",
          evaluacion
        });
      } catch (err) {
        console.log(err);
        return res.status(200).json({
          mensaje: err,
        });
      }
    } else {
      fs.unlink(req.file.path, (e) => {
        return res.status(200).json({
          mensaje: "Formatos aceptados: jpg, png, pdf, doc y txt",
        });
      });
    }
  } else {
    console.log("No tiene archivo");

    try {
      const insertData= await prisma.evaluacion.create({ data });
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

const check = async (req, res) => {

  try {
    const tesisByProf = await prisma.prof_tesis.findMany({
      where: {
        id_profesor: req.body.id_user,
        rol: "Observador",
      },
      include: {
        tesis: {
          include: {
            alumnos: {
              include: {
                usuarios: true,
              },
            },
            avances: {
              include: {
                evaluacion: {
                  where: {
                    id_profesor: req.body.id_user
                  }
                }
              }
            },
            prof_tesis: {
              include: {
                profesores: {
                  include: {
                    usuarios: true,
                  },
                },
              },
            },
          },
        },
      },
    });



    tesisByProf.forEach( async(tesis) => {
      console.log('Esta es la tesis')

      let observadoresCalificados = await prisma.prof_tesis.findMany({
        where: {
          id_tesis: tesis.tesis.id_tesis,
          rol: "Observador",
        }
      })

      let observadores = await prisma.evaluacion.findMany({
        where: {
          id_tesis: tesis.tesis.avances.id_tesis,
          id_avance: tesis.tesis.avances.id_avance,
          numero_avance: tesis.tesis.avances.numero_avance,
        }
      })

      if(observadoresCalificados.length == observadores.length){
        console.log('Ya fueron todos chaval')

        const updateAvances = await prisma.avances.updateMany({
          where: {
            id_avance: tesis.tesis.avances.id_avance,
          },
          data: {
            revisado: 'revisado',
          },
        });

      }else{
        console.log('Faltaron')
      }

    })

    return res.status(200).json({
      mensaje: "Ok",
      tesisByProf,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

module.exports = {
  save,
  check,
};
