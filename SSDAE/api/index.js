const express = require('express');
const cors = require('cors');

const usuarioRouter = require('./paths/usuario');
const resetPassRouter = require('./paths/resetPass');
const tesisRouter = require('./paths/tesis');
const avancesRouter = require('./paths/avances')
const historialRouter = require("./paths/historial")
const historialProfesoresRouter = require("./paths/historialProfesores")

const puerto = 3000;
const app = express();

//Cargar datos en la base de datos
//user.insert();

//Para el cross-domain
app.use(cors());

//Ya te lo convierte a objeto lo que llega
app.use(express.json()); //Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // form-urlencoded

//Rutas
//Rutas para alumnos
app.use("/usuario",usuarioRouter); 

//Rutas para resetear contrasena
app.use("/resetPass",resetPassRouter); 

app.use("/tesis",tesisRouter);

app.use("/avances",avancesRouter);

app.use("/historial",historialRouter);

app.use("/historial",historialProfesoresRouter);


//Crear serivodor y escuchar peticiones
app.listen(puerto, () => {
    console.log('Aplicacion corriendo puerto 3000');
});


 