const express = require('express');
const usuarioController = require('../controllers/usuario');

const router = express.Router();

//Rutas
router.post("/create", usuarioController.create);
router.post("/validation", usuarioController.validation);
router.get("/fillTable", usuarioController.fillTable);

module.exports = router;