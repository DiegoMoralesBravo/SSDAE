const express = require('express');
const tesis = require('../controllers/tesis');

const router = express.Router();

//Rutas
router.post("/create", tesis.create);
router.post("/delete", tesis.deleteTesis);
router.get("/fillTable", tesis.fillTable);
router.get("/fillTableStudent", tesis.fillTableStudent);
router.post("/fillTableTeacher", tesis.fillTableTeacher);
router.post("/asignStudent", tesis.asignStudent);
router.post("/asignStudentName", tesis.asignStudentName);
// router.post("/validation", tesis.validation);
router.post("/asignTeacher", tesis.asignTeacher);
router.post("/fillTableProf_tesis", tesis.fillTableProf_tesis);
router.post("/unsignTeacher", tesis.unsignTeacher);
router.post("/rolTeacher", tesis.rolTeacher);
router.post("/checkRoles", tesis.checkRoles);



module.exports = router;