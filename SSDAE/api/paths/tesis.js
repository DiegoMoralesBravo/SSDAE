const express = require('express');
const tesis = require('../controllers/tesis');

const router = express.Router();

//Rutas
router.post("/create", tesis.create);
router.post("/delete", tesis.deleteTesis);
router.get("/fillTable", tesis.fillTable);
router.post("/asignStudent", tesis.asignStudent);


module.exports = router;