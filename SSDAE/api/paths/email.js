const express = require('express');
const emailController = require('../controllers/email');

const router = express.Router();

//Rutas
router.post("/resetPass", emailController.resetPass);

module.exports = router;