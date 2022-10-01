const express = require('express');
const alumnoController = require('../controllers/alumno');

const router = express.Router();

//Rutas
router.post("/create", alumnoController.create);

module.exports = router;