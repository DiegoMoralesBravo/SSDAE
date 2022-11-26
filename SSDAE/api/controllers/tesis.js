const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  //Recoger los parametros por post a guardar
  let dataPost = req.body;
  let data = {
    tema: dataPost.tema,
    descripcion: dataPost.descripcion,
    id_alumno: 1,
  };

  //Insertar los datos en la base
  try {
    const insertData = await prisma.tesis.create({ data });
    return res.status(200).json({
      mensaje: "Tesis created",
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const fillTableStudent = async (req, res) => {
  try {
    const alumnos = await prisma.usuarios.findMany({
      where: {
        tipo_usuario: "alumno",
      },
    });

    const tesis = await prisma.tesis.findMany();

    newUsuarios = [];

    for (i = 0; i < alumnos.length; i++) {
      flag = 0;

      for (j = 0; j < tesis.length; j++) {
        if (alumnos[i].id_usuario == tesis[j].id_alumno) {
          console.log("Este cumple");
          console.log(alumnos[i]);
          flag = 1;
        }
      }
      if (!flag) {
        newUsuarios.push(alumnos[i]);
      }
    }
    return res.status(200).json(JSON.stringify(newUsuarios));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const fillTable = async (req, res) => {
  try {
    //Insertar los datos en la base
    const tabla = await prisma.tesis.findMany({
      include: {
        prof_tesis: {
          include: {
            profesores: {
              include: {
                usuarios: true,
              },
            },
          },
        },
        alumnos: {
          include: {
            usuarios: true,
          },
        },
      },
    });

    return res.status(200).json({
      tabla: tabla,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const fillTableTeacher = async (req, res) => {
  let dataPost = req.body;
  try {
    const profesores = await prisma.profesores.findMany({
      where: {
        prof_tesis: {
          none: {
            id_tesis: dataPost.id_tesis,
          },
        },
      },
      include: {
        usuarios: true,
      },
    });
    return res.status(200).json({
      profesores: profesores,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteTesis = async (req, res) => {
  try {
    await prisma.tesis.delete({
      where: {
        id_tesis: req.body.id,
      },
    });

    return res.status(200).json({
      mensaje: "Tesis deleted",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const asignStudent = async (req, res) => {
  data = req.body;
  try {
    const updateStudent = await prisma.tesis.update({
      where: {
        id_tesis: data.id_tesis,
      },
      data: {
        id_alumno: data.id_usuario,
      },
    });

    return res.status(200).json({
      mensaje: "Student asigned",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const asignStudentName = async (req, res) => {
  data = req.body;

  try {
    const user = await prisma.usuarios.findUnique({
      where: {
        id_usuario: data.id_usuario,
      },
      select: {
        nombre: true,
        ap_p: true,
        ap_m: true,
        correo: true,
      },
    });
    return res.status(200).json({
      mensaje: "Student consult",
      user: user,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// const validation = async (req, res) => {
//   console.log("Validacion de usuario");
//   //Recoger los parametros por post a guardar
//   let data = req.body;

//   //Leer la base de dato
//   const user = await prisma.tesis.findUnique({
//     where: {
//       id_tesis: data.id_tesis,
//     },
//   });

//   return res.status(200).json({
//     mensaje: "User found",
//     user: user,
//   });
// };

const asignTeacher = async (req, res) => {
  let dataPost = req.body;

  let data = {
    id_profesor: dataPost.id_usuario,
    id_tesis: dataPost.id_tesis,
    rol: "Sin rol",
  };

  try {
    //Insertar los datos en la base
    const prof_tesis = await prisma.prof_tesis.create({ data });
    return res.status(200).json({
      mensaje: "Teacher asigned",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const fillTableProf_tesis = async (req, res) => {
  dataPost = req.body;

  try {
  //Insertar los datos en la base
  const prof_tesis = await prisma.prof_tesis.findMany({
    where: {
      id_tesis: dataPost.id_tesis,
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
    mensaje: "Maestros mostrados",
    prof_tesis: prof_tesis,
  });
  } catch (error) {
    return res.status(400).send(error.message);
  }

};

const unsignTeacher = async (req, res) => {
  dataPost = req.body;
    try {
        await prisma.prof_tesis.deleteMany({
            where: {
              id_profesor: dataPost.id_profesor,
              id_tesis: dataPost.id_tesis,
            },
          });
        
          return res.status(200).json({
            mensaje: "Maestro eliminado",
          });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const rolTeacher = async (req, res) => {
  //Recoger los parametros por post a guardar
  let dataPost = req.body;

  try {
      //Leer la base de dato de alumnos
  const updateUsers = await prisma.prof_tesis.updateMany({
    where: {
      id_profesor: dataPost.id_profesor,
    },
    data: {
      rol: dataPost.rol,
    },
  });

  return res.status(200).json({
    mensaje: "Rol modificado",
  });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  create,
  fillTableStudent,
  fillTableTeacher,
  fillTable,
  deleteTesis,
  asignStudent,
  asignStudentName,
  asignTeacher,
  // validation,
  fillTableProf_tesis,
  unsignTeacher,
  rolTeacher,
};
