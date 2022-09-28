const express = require('express');
const emailController = require('../controllers/email');

const router = express.Router();

//Rutas
router.get("/test", emailController.test);

module.exports = router;