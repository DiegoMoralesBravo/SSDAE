const express = require('express');
const tesis = require('../controllers/tesis');

const router = express.Router();

//Rutas
router.post("/create", tesis.create);
router.get("/fillTable", tesis.fillTable);


module.exports = router;