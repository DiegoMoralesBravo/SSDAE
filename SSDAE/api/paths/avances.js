const express = require('express');
const avances = require('../controllers/avances');

const router = express.Router();

//Rutas
router.post("/saveFile", avances.saveFile);

module.exports = router; 