const express = require('express');
const cors = require('cors');
//const user  = require('./models/User');
const routerUser = require('./paths/user');

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
app.use("/user",routerUser); 



//Crear serivodor y escuchar peticiones
app.listen(puerto, () => {
    console.log('Example app listening on port 3000.');
});
