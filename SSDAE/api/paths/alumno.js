const express = require('express');
const alumnoController = require('../controllers/alumno');

const router = express.Router();

//Rutas
router.post("/create", alumnoController.create);
router.post("/validation", alumnoController.validation);

module.exports = router;