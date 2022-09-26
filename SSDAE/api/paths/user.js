const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

//Rutas
router.get("/test", userController.test);
router.post("/create", userController.create);


module.exports = router;