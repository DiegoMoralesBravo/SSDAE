const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'Soy una prueba'
    });
};

const create = (req, res) => {

    //Recoger los parametros por post a guardar


    //Validar datos

    //Crear objeto a guardar

    return res.status(200).json({
        mensaje: 'User created'
    });
};


module.exports ={
    test,
    create
}