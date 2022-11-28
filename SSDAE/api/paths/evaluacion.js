const express = require('express');
const evaluacionController = require('../controllers/evaluacion');
const multer = require('multer');
const router = express.Router();


const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../app/public/evaluaciones');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const subidas = multer({ storage: almacenamiento })


//Rutas
router.post("/save",[subidas.single('file')], evaluacionController.save);
router.post("/check", evaluacionController.check);

module.exports = router;