const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUsuario() {
  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      correo: 'root@gmail.com',
      contrasena: 'c4ca4238a0b923820dcc509a6f75849b',
      tipo_usuario: 'root',
      nombre: 'jose',
      ap_p: 'sanchez',
      ap_m: 'soto',
    },
  });

  const alumno = await prisma.usuarios.create({
    data: {
      correo: 'diegomorales@gmail.com',
      contrasena: 'c4ca4238a0b923820dcc509a6f75849b',
      tipo_usuario: 'alumno',
      nombre: 'diego',
      ap_p: 'morales',
      ap_m: 'bravo',
    },
  });

  const alumno2 = await prisma.alumnos.create({
    data: {
      estatus: 'Insertart estatus',
      ano_ingreso: 2023,
      ciclo: 'a',
    },
  });
}

createUsuario();
prisma.$disconnect();
