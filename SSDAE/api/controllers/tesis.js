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

    for (i = 0; i < alumnos.length; i++) {
        flag = 0;

        for (j = 0; j < tesis.length; j++) {

            if (alumnos[i].id_usuario == tesis[j].id_alumno) {
                console.log('Este cumple')
                console.log(alumnos[i])
                flag = 1;
            }

        }
        if (!flag) {
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

    for (i = 0; i < tesis.length; i++) {
        for (j = 0; j < alumnos.length; j++) {
            if (tesis[i].id_alumno == alumnos[j].id_usuario) {
                tesis[i].nombre = alumnos[j].nombre + ' ' + alumnos[j].ap_p + ' ' + alumnos[j].ap_m
            }
        }
    }

    for (i = 0; i < tesis.length; i++) {
        if (tesis[i].nombre == undefined) {
            tesis[i].nombre = 'Sin asignar'
        }
    }


    return res.status(200).json({
        tesis: tesis
    }
    );
}

const fillTableTeacher = async (req, res) => {
    console.log('Se obtendran todos los datos de maestros que no esten asignados a esta tesis')

    console.log(req.body);

    let dataPost = req.body;

    const profesores = await prisma.profesores.findMany({
        where: {
            prof_tesis: {
                none: {
                    id_tesis: dataPost.id_tesis
                }
            }
        },
        include: {
            usuarios: true
        }
    });




    console.log(profesores)
    console.log('Se presentaron')


    return res.status(200).json({
        profesores: profesores
    }
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

const asignTeacher = async (req, res) => {
    console.log('Se asignara maestro')

    let dataPost = req.body;
    console.log(dataPost)

    let data = {
        id_profesor: dataPost.id_usuario,
        id_tesis: dataPost.id_tesis,
        rol: 'Sin rol'
    }

    //Insertar los datos en la base
    const prof_tesis = await prisma.prof_tesis.create({ data });

    return res.status(200).json({
        mensaje: 'Teacher asigned'
    }
    );
}

const fillTableProf_tesis = async (req, res) => {
    console.log('Se mostraran maestros relacionados a la tesis')

    dataPost = req.body;

    //Insertar los datos en la base
    const prof_tesis = await prisma.prof_tesis.findMany({
        where: {
            id_tesis: dataPost.id_tesis
        },
        include: {
            profesores: {
                include: {
                    usuarios: true
                }
            },
        }
    });

    return res.status(200).json({
        mensaje: 'Maestros mostrados',
        prof_tesis: prof_tesis
    }
    );
}

const unsignTeacher = async (req, res) => {
    console.log('Desasignar maestro de tema de tesis');

    dataPost = req.body;
    console.log(dataPost)

    await prisma.prof_tesis.deleteMany({
        where: {
            id_profesor: dataPost.id_profesor,
            id_tesis: dataPost.id_tesis
        }
    })

    return res.status(200).json({
        mensaje: 'Maestro eliminado'
    }
    );
}

const rolTeacher = async (req, res) => {
    console.log('Se asignara rol')
    //Recoger los parametros por post a guardar
    let dataPost = req.body;

    console.log(dataPost)

    //Leer la base de dato de alumnos
    const updateUsers = await prisma.prof_tesis.updateMany({
        where: {
            id_profesor: dataPost.id_profesor,
        },
        data: {
            rol: dataPost.rol
        },
    })

    


    return res.status(200).json({
        mensaje: 'Rol modificado'
    }
    );
}


module.exports = {
    create,
    fillTableStudent,
    fillTableTeacher,
    fillTable,
    deleteTesis,
    asignStudent,
    asignStudentName,
    asignTeacher,
    validation,
    fillTableProf_tesis,
    unsignTeacher,
    rolTeacher

}