const express = require('express');
const cors = require('cors');

const userRouter = require('./paths/user');
const emailRouter = require('./paths/email');
const alumnoRouter = require('./paths/alumno');
const resetPassRouter = require('./paths/resetPass');

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


//Rutas user
app.use("/user",userRouter); 

//Rutas para email
app.use("/email",emailRouter); 

//Rutas para alumnos
app.use("/alumno",alumnoRouter); 

//Rutas para resetear contrasena
app.use("/resetPass",resetPassRouter); 

//Crear serivodor y escuchar peticiones
app.listen(puerto, () => {
    console.log('Example app listening on port 3000.');
});


 