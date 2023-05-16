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
}

createUsuario();
prisma.$disconnect();
