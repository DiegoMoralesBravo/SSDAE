const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const schema = {
    data:{
        id: 10,
        name: 'Perron'
    }
};

const insert = async() => {
    try {
        console.log('Iniciando conexion base de datos')
        const newData = await prisma.test_table.create(schema);
    }
    catch (error) {
        console.log(error);
    }
} 

module.exports = {
    insert
}