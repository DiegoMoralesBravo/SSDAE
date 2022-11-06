const express = require('express');
const tesis = require('../controllers/tesis');

const router = express.Router();

//Rutas
router.post("/create", tesis.create);
router.post("/delete", tesis.deleteTesis);
router.get("/fillTable", tesis.fillTable);
router.get("/fillTableStudent", tesis.fillTableStudent);
router.get("/fillTableTeacher", tesis.fillTableTeacher);
router.post("/asignStudent", tesis.asignStudent);
router.post("/asignStudentName", tesis.asignStudentName);
router.post("/validation", tesis.validation);
router.post("/asignTeacher", tesis.asignTeacher);




module.exports = router;