const express = require('express');
const historialProfesores = require("../controllers/historialProfesores")

const router = express.Router();

//Rutas
router.post("/profesores", historialProfesores.getDataToHistorialProfesores);

module.exports = router; 
