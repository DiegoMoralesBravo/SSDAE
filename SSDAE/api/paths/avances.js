const express = require('express');
const avances = require('../controllers/avances');
const multer = require('multer');
const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../app/public/avances');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const subidas = multer({ storage: almacenamiento })

//Rutas
router.post("/saveFile", [subidas.single('file')], avances.saveFile);
router.post("/checkTesis", avances.checkTesis);
router.post("/changeFile", [subidas.single('file')] ,avances.changeFile);
router.get("/avancesControl",avances.avancesControl);



module.exports = router; 