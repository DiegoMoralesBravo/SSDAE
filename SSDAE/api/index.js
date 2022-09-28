const express = require('express');
const cors = require('cors');

const userRouter = require('./paths/user');
const emailRouter = require('./paths/email');

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


//Crear serivodor y escuchar peticiones
app.listen(puerto, () => {
    console.log('Example app listening on port 3000.');
});


 