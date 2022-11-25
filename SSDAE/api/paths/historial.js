const express = require('express');
const historial = require("../controllers/historial")

const router = express.Router();

//Rutas
router.post("/alumnos", historial.getDataToHistorial);

module.exports = router; 
