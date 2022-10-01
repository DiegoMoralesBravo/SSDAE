const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

//Rutas
router.post("/create", userController.create);
router.post("/validation", userController.validation);


module.exports = router;