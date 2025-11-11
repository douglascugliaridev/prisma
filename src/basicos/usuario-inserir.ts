import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function exercicio() {
    await prisma.usuario.create({
        data: {
            nome: "Usuario 1",
            email: "usuario1@gmail.com",
            senha: "123456"
        }
    })
}

exercicio();
