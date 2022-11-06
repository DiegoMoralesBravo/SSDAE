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

const fillTableStudent = async (req, res) => {
    console.log('Se obtendran todos los datos tabla alumnos no asignados')
    const alumnos = await prisma.usuarios.findMany({
        where: {
            tipo_usuario: "alumno"
        }
    });

    const tesis = await prisma.tesis.findMany();

    console.log('Alumnos')
    console.log(alumnos)
    console.log('tesis')
    console.log(tesis)

    newUsuarios = [];

    for(i = 0; i < alumnos.length; i++){
        flag = 0;

        for(j = 0; j < tesis.length; j++){

            if(alumnos[i].id_usuario == tesis[j].id_alumno){
                console.log('Este cumple')
                console.log(alumnos[i])
                flag = 1;
            } 

        }
        if(!flag) {
            newUsuarios.push(alumnos[i]); 
        } 

    }
    return res.status(200).json(
        JSON.stringify(newUsuarios)
    );
}

const fillTable = async (req, res) => {

    console.log('Se obtendran todos los datos')
    const tesis = await prisma.tesis.findMany();
    const alumnos = await prisma.usuarios.findMany({
        where: {
            tipo_usuario: 'alumno',
        },
        select: {
            nombre: true,
            ap_p: true,
            ap_m: true,
            id_usuario: true
        },
    });

        for(i = 0; i < tesis.length; i++){
            for(j = 0; j < alumnos.length; j++){
                if(tesis[i].id_alumno == alumnos[j].id_usuario){
                    tesis[i].nombre = alumnos[j].nombre + ' ' + alumnos[j].ap_p +  ' ' + alumnos[j].ap_m
                }
            }
        }
    
        for(i = 0; i < tesis.length; i++){
            if(tesis[i].nombre == undefined){
                tesis[i].nombre = 'Sin asignar'
            }
        }
   
   
    return res.status(200).json({
        tesis: tesis
    }
    );
}

const fillTableTeacher = async (req, res) => {
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

    await prisma.tesis.delete({
        where: {
            id_tesis: req.body.id,
        },
    })

    return res.status(200).json({
        mensaje: 'Tesis deleted'
    }
    );
}

const asignStudent = async (req, res) => {
    console.log('Se asignara estudiante')
    data = req.body;
    console.log(data)
    const updateStudent = await prisma.tesis.update({
        where: {
            id_tesis: data.id_tesis,
        },
        data: {
            id_alumno: data.id_usuario
        },
    })
    console.log(updateStudent)
    return res.status(200).json({
        mensaje: 'Student asigned'
    }
    );
}

const asignStudentName = async (req, res) => {
    data = req.body;
    const user = await prisma.usuarios.findUnique({
        where: {
            id_usuario: data.id_usuario,
        },
        select: {
            nombre: true,
            ap_p: true,
            ap_m: true,
        },
    })

    return res.status(200).json({
        mensaje: 'Student consult',
        user: user,
    }
    );
}

const validation = async (req, res) => {
    console.log('Validacion de usuario');
    //Recoger los parametros por post a guardar
    let data = req.body;

    //Leer la base de dato
    const user = await prisma.tesis.findUnique({
        where: {
            id_tesis: data.id_tesis,
        },
    })

    return res.status(200).json({
        mensaje: 'User found',
        user: user

    });

};


module.exports = {
    create,
    fillTableStudent,
    fillTableTeacher,
    fillTable,
    deleteTesis,
    asignStudent,
    asignStudentName,
    validation

}