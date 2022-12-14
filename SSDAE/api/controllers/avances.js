const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const checkTesis = async (req, res) => {
  try {
    const tesis = await prisma.tesis.findMany({
      where: {
        id_alumno: req.body.id_user,
      },
    });

    const alumno = await prisma.alumnos.findMany({
      where: {
        id_alumno: req.body.id_user,
      },
    });

    const buzon = await prisma.avancescontrol.findMany({
      where: {
        ano_ingreso: alumno[0].ano_ingreso,
        ciclo: alumno[0].ciclo,
      },
    });

    if (tesis.length > 0) {
      const avances = await prisma.avances.findMany({
        where: {
          id_tesis: tesis[0].id_tesis,
        },
      });

      return res.status(200).json({
        mensaje: "Si hay tesis",
        tesis: tesis,
        avance: avances,
        buzon: buzon[0].estatus,
      });
    } else {
      return res.status(200).json({
        mensaje: "No hay tesis asignada",
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const saveFile = async (req, res) => {
  try {
    const extension = req.file.originalname.split(".")[1];

    if (extension == "zip" || extension == "rar") {
      data = {
        numero_avance: parseInt(req.body.numeroAvance),
        id_tesis: parseInt(req.body.idTesis),
        doc: req.file.filename,
        revisado: "sin revisar",
      };

      // //Insertar los datos en la base
      const avances = await prisma.avances.create({ data });

      return res.status(200).json({
        mensaje: "Archivo guardado",
        avances,
      });
    } else {
      fs.unlink(req.file.path, (e) => {
        return res.status(400).json({
          mensaje: "Archivo no guardado",
        });
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const changeFile = async (req, res) => {
  try {
    const extension = req.file.originalname.split(".")[1];
    if (extension == "zip" || extension == "rar") {
      const updateDoc = await prisma.avances.updateMany({
        where: {
          doc: req.body.oldName,
        },
        data: {
          doc: req.file.filename,
        },
      });

      fs.unlink("../app/public/avances/" + req.body.oldName, (e) => {
        console.log("Se elimino");
      });

      return res.status(200).json({
        mensaje: "Archivo guardado",
        docName: req.file.filename,
      });
    } else {
      fs.unlink(req.file.path, (e) => {
        return res.status(400).json({
          mensaje: "Archivo no guardado",
        });
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const avancesControl = async (req, res) => {
  try {
    const avancescontrolTable = await prisma.avancescontrol.findMany();

    if (avancescontrolTable.length == 0) {
      return res.status(200).json({
        mensaje: "No hay alumnos",
        avancescontrolTable,
      });
    }

    return res.status(200).json({
      mensaje: "Ok",
      avancescontrolTable,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const activarDesactivar = async (req, res) => {
  try {
    const updateBuzon = await prisma.avancescontrol.updateMany({
      where: {
        ano_ingreso: req.body.ano_ingreso,
        ciclo: req.body.ciclo,
      },
      data: {
        estatus: req.body.estatus,
      },
    });

    return res.status(200).json({
      mensaje: "ok",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  saveFile,
  checkTesis,
  changeFile,
  avancesControl,
  activarDesactivar,
};
