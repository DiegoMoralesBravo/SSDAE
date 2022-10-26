const express = require('express');
const usuarioController = require('../controllers/usuario');

const router = express.Router();

//Rutas
router.post("/create", usuarioController.create);
router.post("/validation", usuarioController.validation);
router.post("/emailValidation", usuarioController.emailValidation);
router.get("/fillTable", usuarioController.fillTable);
router.post("/delete", usuarioController.deleteUser);
router.post("/edit", usuarioController.editUser);

module.exports = router;