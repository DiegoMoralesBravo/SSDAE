const express = require('express');
const avances = require('../controllers/avances');
const multer = require('multer');

const router = express.Router();


const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../avances/');
    },
    filename: (req, file, cb) => {
        cb(null, 'test' + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})

//Rutas
router.post("/saveFile", [subidas.single('file')], avances.saveFile);

//Esto es un comentario

module.exports = router; 