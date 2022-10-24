const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {

    console.log('Creacion de tesis');
    //Recoger los parametros por post a guardar

    let dataPost = req.body;
    console.log(dataPost)

    

    let data = {
        tema: dataPost.tema,
        descripcion: dataPost.descripcion,   
        id_alumno: 1,
    }


    //Insertar los datos en la base
    try {
        const insertData = await prisma.tesis.create({ data });
        return res.status(200).json({
            mensaje: 'Tesis created',
        });

    } catch (err) {
        console.log(err);
        return res.status(200).json({
            mensaje: err,
        });
    }



}

const fillTable = async (req, res) => {
    console.log('Se obtendran todos los datos')
    const tesis = await prisma.tesis.findMany();

    console.log(tesis)
    return res.status(200).json(
        JSON.stringify(tesis)
    );
}

const deleteTesis = async (req, res) => {
    console.log('Se elimina usuario')
    console.log(req.body)
    
    await prisma.usuarios.delete({
        where: {
            id_usuario: req.body.id,
        },
    })

    return res.status(200).json({
        mensaje: 'User deleted'
    }
    );
}


module.exports = {
    create,
    fillTable,
    deleteTesis,


}