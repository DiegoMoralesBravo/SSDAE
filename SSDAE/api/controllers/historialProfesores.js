const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getDataToHistorialProfesores = async (req, res) => {
  
    // obtener datos de usuario maestro

    const data = req.body; 
  
    if (data.tipo_usuario == "maestro") {
      console.log("entra al maestro");
  
      const tesisByProf = await prisma.prof_tesis.findMany({
        where: {
          id_profesor: data.id_user,
        },
        include: {
          tesis: {
            include: {
              alumnos:{

                include:{
                  usuarios:true
                }
              },
              avances: true,
              prof_tesis: {

                include:{
                  profesores:{
                    include:{
                      usuarios: true            
                    }
                  }
                }
              }
            },
          },
        },
      });

      

      return res.status(200).json({
        mensaje: "succes",
        tesisByProf
    
      });
  
      //console.log(tesisByProf);
    }
  
    return res.status(404).json({
      mensaje: "No es un maestro"  
    });
  };
  
  module.exports = {
    getDataToHistorialProfesores,
  };
  