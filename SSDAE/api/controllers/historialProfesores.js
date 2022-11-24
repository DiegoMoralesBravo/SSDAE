const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getDataToHistorialProfesores = async (req, res) => {
  
    // obtener datos de usuario maestro
  
    if (data.tipo_usuario == "maestro") {
      console.log("entra al maestro");
  
      const tesisByProf = await prisma.prof_tesis.findMany({
        where: {
          id_profesor: data.id_user,
        },
        include: {
          tesis: true,
  
          profesores: {
            include: {
              usuarios: true,
            },
          },
        },
      });
  
      //console.log(tesisByProf);
    }
  
    return res.status(200).json({
      mensaje: "succes",
      tesisByProf
  
    });
  };
  
  module.exports = {
    getDataToHistorialProfesores,
  };
  