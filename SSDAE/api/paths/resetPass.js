const express = require('express');
const resetPass = require('../controllers/resetPass');

const router = express.Router();

//Rutas
router.post("/userValidation", resetPass.userValidation);
router.post("/tokenValidation", resetPass.tokenValidation);
router.post("/passChange", resetPass.passChange);

module.exports = router;