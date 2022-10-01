const express = require('express');
const resetPass = require('../controllers/resetPass');

const router = express.Router();

//Rutas
router.post("/userValidation", resetPass.userValidation);

module.exports = router;