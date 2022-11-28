const express = require('express');
const historial = require("../controllers/historial")

const router = express.Router();

//Rutas
router.post("/alumnos", historial.getDataToHistorial);
router.post("/alumnosEvaluaciones", historial.evaluaciones);
router.post("/getComentarios", historial.getComentarios);




module.exports = router; 
