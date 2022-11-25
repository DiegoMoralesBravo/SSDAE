const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDataToHistorial = async (req, res) => {

  console.log("entro al endpoint");
  
  const data = req.body;
  
  console.log(data);

  if (data.tipo_usuario == "alumno") {
    const tesis = await prisma.tesis.findMany({
      where: {
        id_alumno: data.id_user,
      },
    });

    const prof_tesis = await prisma.prof_tesis.findMany({
      where: {
        id_tesis: tesis[0].id_tesis,
      },
    });

    console.log("-----------busqueda encadenada--------------");

    console.log(prof_tesis);
    

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
    });
  }

}

module.exports = {
  getDataToHistorial,
};
